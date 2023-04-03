<template>
    <v-card>
        <v-row>
            <v-col>
                <v-card-item>
                    {{ item.name }}
                    <v-text-field
                        v-model=newItem.name
                        label="new name"
                    ></v-text-field>
                    {{ item.price }}
                    <v-text-field
                        v-model=newItem.price
                        label="new price"
                    ></v-text-field>
                    {{ item.description }}
                    <v-text-field
                        v-model=newItem.description
                        label="new description"
                    ></v-text-field>
                </v-card-item>
                <v-card-item>
                    <v-card-title @click="sectionFlagFunc()">
                        {{ newItem.section.name ? newItem.section.name : item.section.name }}
                        <v-icon icon="mdi-account-edit"/>
                    </v-card-title>
                </v-card-item>
                <v-card-item>
                    <v-card-title @click="optionsFlagFunc()">
                        Options: 
                        
                        <template v-if="newItem.options.length">
                            <v-card-title
                                v-for="(option,i) in newItem.options"
                                :key="i"
                                @click="newItem.options.splice(i,1)"
                            >
                                {{ option.name }}
                                <v-icon icon="mdi-close"/>
                            </v-card-title>
                        </template>
                        <template v-else>
                            <v-icon icon="mdi-account-edit"/>
                            <v-card-title
                                v-for="(option,i) in item.options"
                                :key="i"
                                
                            >{{ option.name }}
                            
                        </v-card-title>
                        </template>
                        
                    </v-card-title>
                </v-card-item>
                
            </v-col>
            <v-col v-if="sectionFlag || optionsFlag">
                <v-card height="100%">
                    <v-card-title v-if="sectionFlag">Switch Sections:</v-card-title>
                    <v-card-title v-if="optionsFlag">Add Options for Item:</v-card-title>
                    <v-card-item>
                        <div v-if="optionsFlag">
                            <v-chip
                                v-for="(section,i) in sections"
                                :key="i"
                                @click="addOption(section)"
                            >
                                {{ section.name }}
                            </v-chip>
                        </div>
                        <div v-if="sectionFlag">
                            <v-chip
                                v-for="(section,i) in sections"
                                :key="i"
                                @click="addSection(section)"
                            >
                                {{ section.name }}
                            </v-chip>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="submitFlag">
            <v-card>
                <v-card-title>Are you sure you want to edit {{ item.name }}</v-card-title>
                <displayItem :item="newItem" :flag="false"/>
                <v-card-actions>
                    <v-btn @click="submitChanges()">Yes</v-btn>
                    <v-btn @click="submitFlag=false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteFlag">
            <v-card>
                <v-card-title>Are you sure you want to delete {{ item.name }}</v-card-title>
                <v-card-actions>
                    <v-btn @click="deleteItem()">Yes</v-btn>
                    <v-btn @click="deleteFlag=false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card-actions>
            <v-btn @click="submitFlag=true">Submit Changes</v-btn>
            <v-btn @click="deleteFlag=true">Delete Item</v-btn>
        </v-card-actions>
</v-card>
</template>
<script setup>
const props = defineProps({
    theItem:{
        type: Object,
        required: true
    },
    sections: {
        type: Array,
        required: true
    },
    theItems: {
        type: Array,
        required: true
    }
})

</script>
<script>
export default {
    data(){
        return{
            optionsFlag: false,
            sectionFlag: false,
            submitFlag: false,
            deleteFlag: false,
            newItem: {
                _id: '',
                name: '',
                description: '',
                price: 0,
                section_id: '',
                section: {
                    name: '',
                },
                options: []
            } ,
            item: this.getItem(),
            items: this.getItems(),
        }
    },
    methods: {
        getItem(){
            const section = this.sections.find(section=>section._id===this.theItem.section_id);
            const holder = {
                name: section.name ? section.name : '',
                _id: section._id ? section._id : '',
                choice: section.choice ? section.choice : 0,
                suggested: section.suggested ? section.suggested : [],
                ingr: section.ingr ? section.ingr : []
            }
            this.theItem.section = holder;
            return this.theItem;
        },
        getItems(){
            this.theItems.forEach((item)=>{
                const section = this.sections.find(section=>section._id===this.theItem.section_id);
                const holder = {
                    name: section.name,
                    _id: section._id,
                    choice: section.choice ? section.choice : 0,
                    suggested: section.suggested ? section.suggested : [],
                    ingr: section.ingr ? section.ingr : []
                }
                item.section = holder;
            })
            return this.theItems;
        },
        sectionFlagFunc(){
            this.sectionFlag =!this.sectionFlag;
            this.optionsFlag = false;
        },
        newSectionFlagFunc(){
            this.newSectionFlag=!this.newSectionFlag;
            this.sectionFlag=false;
        },
        async deleteItem(){
            await useFetch('/api/items/'+this.theItem._id, {
                method: 'DELETE'
            });
            this.$router.push({path: '/editmenu/items'})
        },
        async submitChanges(){
            const holder = {
                _id: this.item._id,
                name: this.newItem.name ? this.newItem.name : this.item.name,
                price: this.newItem.price ? this.newItem.price : this.item.price,
                section_id: this.newItem.section_id ? this.newItem.section_id : this.item.section_id,
                options: this.newItem.options.length ? this.newItem.options : this.item.options,
                description: this.newItem.description ? this.newItem.description : this.item.description
            }
            await useFetch('/api/items/'+this.item._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            });
            this.sections.forEach(section=>{
                if(section.ingr.length){
                    let ingrIndex = section.ingr.findIndex((item)=>item._id===holder._id);
                    if(!(ingrIndex<0)){
                        section.ingr[ingrIndex] = holder;
                        console.log('sec',section);
                        if(section.suggested.length){
                            let sugIndex = section.suggested.findIndex((item)=>item._id===holder._id)
                            if(!(sugIndex<0)){
                                section.suggested[sugIndex] = holder;
                            }
                        }
                        this.updateSectionsWItem(section)
                    } 
                }
                
            })
            this.$router.push({path:'/editMenu/items'})
        },
        async updateSectionsWItem(section){
            const holder={...section}
            await useFetch('/api/sections/'+section._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            })
            this.theItems.forEach(item=>{
                if(item.options.length){
                    let opIndex = item.options.findIndex((option)=>option._id===section._id);
                    if(!(opIndex<0)){
                        item.options[opIndex] = holder;
                        this.updateItemOption(item)
                    }
                }
            })
        },
        async updateItemOption(item){
            const holder = {...item}
            await useFetch('/api/items/'+item._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            });
        },
        optionsFlagFunc(){
            this.optionsFlag=!this.optionsFlag;
            this.sectionFlag = false;
        },
        addSection(section){
            this.newItem.section = {
                name: section.name,
                _id: section._id,
                choice: section.choice,
                suggested: section.suggested,
                ingr: section.ingr,
            }
            this.newItem.section_id = this.newItem.section._id;
        },
        addOption(option){
           let flag = this.newItem.options.some((item)=>item._id===option._id);
           if(!(flag)){
            this.newItem.options.push(option)
           }
        },
        addSuggested(suggested){
            let flag = this.newSection.suggested.some((item)=>item._id===suggested._id);
            if(!(flag)){
                this.newSection.suggested.push(suggested);
            }
        },
        addIngr(ingr){
            let flag = this.newSection.ingr.some((item)=>item._id===ingr._id);
            if(!(flag)){
                this.newSection.ingr.push(ingr)
            }
        },
    }
}
</script>

