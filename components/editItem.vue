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
                        Section: 
                        <v-chip>{{ newItem.section.name ? newItem.section.name : 'no name' }}<v-icon icon="mdi-close"/></v-chip>
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
                               <v-chip> {{ option.name }}<v-icon icon="mdi-close"/></v-chip>
                                
                            </v-card-title>
                        </template>
                        <template v-else>
                            <v-icon icon="mdi-account-edit"/>
                            <v-card-title
                                v-for="(option,i) in item.options"
                                :key="i"
                                
                            >
                            <v-chip>{{ option.name }}<v-icon icon="mdi-close"/></v-chip>
                            
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
                            <template
                                v-for="(section,i) in sections"
                                :key="i"
                            >
                                <v-chip @click="addSection(section)">
                                    {{ section.name }}
                                </v-chip>
                            </template>
                            
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
    },
    menus: {
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
            console.log('rt', this.theItem)
            console.log('st', this.item)
            console.log(this.theItems)
            if(this.theItem.section){
                const section = this.sections.find(section=> section._id===this.theItem.section._id);
                if(section){
                    const holder = {
                        name: section.name ? section.name : '',
                        _id: section._id ? section._id : '',
                        choice: section.choice ? section.choice : 0,
                        suggested: section.suggested ? section.suggested : [],
                        ingr: section.ingr ? section.ingr : []
                    }
                    this.theItem.section = holder;
                    }
                
            }
            return this.theItem;
        },
        getItems(){
            this.theItems.forEach((item)=>{
                const section = this.sections.find(section=>section._id===this.theItem.section_id);
                if ( section ){
                    const holder = {
                        name: section.name,
                        _id: section._id,
                        choice: section.choice ? section.choice : 0,
                        suggested: section.suggested ? section.suggested : [],
                        ingr: section.ingr ? section.ingr : []
                    }
                    item.section = holder;
                }
                else {
                    console.log("k ",section)
                }
            })
            console.log('jk', this.theItems)
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
            if(this.theItem.section._id){
                const section = this.sections.find(sec=> sec._id === this.theItem.section._id);
                console.log('del', section);
                if(section.ingr){
                    const index = section.ingr.findIndex(ingr => ingr._id === this.theItem._id);
                    if(index !== -1){
                        section.ingr.splice(index, 1);
                    }
                    console.log('x', section)
                }
                await useFetch('/api/sections/'+section._id, {
                    method: 'PUT',
                    body: JSON.stringify(section)
                });
            }
            
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
                section: {  
                    name: this.newItem.section.name ? this.newItem.section.name : this.item.section.name,
                    _id: this.newItem.section._id ? this.newItem.section._id : this.item.section._id,
                    choices: this.newItem.section.choices ? this.newItem.section.choices : 0,
                    suggested: this.newItem.section.suggested ? this.newItem.section.suggested : [],
                    ingr: this.newItem.section.ingr ? this.newItem.section.ingr : [],
                },
                options: this.newItem.options.length ? this.newItem.options : this.item.options,
                description: this.newItem.description ? this.newItem.description : this.item.description
            }
            //edit item
            await useFetch('/api/items/'+this.item._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            });
            //update item list in section
            this.sections.forEach(section=>{
                console.log('1', section)
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
                        this.updateSectionsWithItem(section)
                        this.updateItemWithSection(section)
                    } 
                }
                
            })
            console.log(this.sections)
            
            this.$router.push({path:'/editMenu/items'})
        },
        async updateSectionsWithItem(section){
            const holder={...section}
            await useFetch('/api/sections/'+section._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            })
            console.log('usi',section)
            this.theItems.forEach(item=>{
                if(item.options.length){
                    let opIndex = item.options.findIndex((option)=>option===section._id);
                    if(!(opIndex<0)){
                        item.options[opIndex] = holder;
                        console.log('item',item)
                        this.updateItemOption(item)
                    }
                }
            })
        },
        async updateItemOption(item){
            const res = await useFetch('/api/items/'+item._id, {
                method: 'PUT',
                body: JSON.stringify(item)
            });
            console.log(res)
        },
        async updateItemWithSection(section){
            this.items.forEach(item=>{
                if(item.section._id === section._id){
                    console.log('update item with section')
                    console.log(section)
                    console.log(item.section)
                    item.section={
                        _id: section._id,
                        name: section.name,
                        choice: section.choice ? section.choice : 0,
                        ingr: section.ingr ? section.ingr : [],
                        suggested: section.suggested ? section.suggested : [],
                    }
                }
            })
        },
        optionsFlagFunc(){
            this.optionsFlag=!this.optionsFlag;
            this.sectionFlag = false;
        },
        addSection(section){
            const sectionHolder = {
                name: section.name,
                _id: section._id,
                choice: section.choice,
                suggested: section.suggested,
                ingr: section.ingr,
            }
            this.newItem.section=sectionHolder
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

