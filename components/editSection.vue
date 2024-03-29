<template>
    <v-card>
        <v-row>
            <v-col>
                <v-card-item>
                    {{ newSection.name ? newSection.name : section.name }}
                    <v-text-field
                        v-model="newSection.name"
                        label="new name"
                    />
                    Number of Choices: {{ newSection.choice ? newSection.choice : section.choice }}
                    <v-text-field
                        v-model="newSection.choice"
                        label="new number"
                    />
                </v-card-item>
                <v-card-item v-if="section.suggested.length">
                    Original Suggested Items: 
                    <v-btn @click="addSuggestedFlagFunc"><v-icon icon="mdi-account-edit"/></v-btn>
                        <v-chip
                            v-for="(suggested,i) in section.suggested"
                            :key="i"
                        >{{ suggested.name }}</v-chip>                    
                </v-card-item>
                <v-card-item v-else>
                    New Suggested Items:
                    <v-chip
                        v-for="(sug,i) in newSection.suggested"
                        :key="i"
                    >
                        {{ sug.name }}
                        <v-icon icon="mdi-close" @click="newSection.suggested.splice(i,1)"/>
                    </v-chip>
                    <v-btn @click="addSuggestedFlag=!addSuggestedFlag"><v-icon icon="mdi-account-edit"/></v-btn>
                </v-card-item>
                <v-card-item v-if="addSuggestedFlag">
                    New Suggested Items:
                    <v-chip
                        v-for="(sug,i) in newSection.suggested"
                        :key="i"
                    >
                        {{ sug.name }}
                        <v-icon icon="mdi-close" @click="newSection.suggested.splice(i,1)"/>
                    </v-chip>
                </v-card-item>
                <v-card-item>
                    Original Items to Choose From: <br/>
                    <v-chip
                        v-for="(ingr,i) in section.ingr"
                        :key="i"
                    >{{ ingr.name }}</v-chip>
                    <v-btn @click="addIngrFlag=!addIngrFlag"><v-icon icon="mdi-account-edit"/></v-btn>
                </v-card-item>
                <v-card-item v-if="addIngrFlag">
                    New Items to Choose From:
                    <v-chip
                        v-for="(ingr,i) in newSection.ingr"
                        :key="i"
                    >
                        {{ ingr.name }}
                        <v-icon icon="mdi-close" @click="newSection.ingr.splice(i,1)"/>
                    </v-chip>
                </v-card-item>
                <v-card-actions>
                    <v-btn @click="submitFlag=true">Submit</v-btn>
                    <v-btn @click="warningFlag=true">Delete</v-btn>
                </v-card-actions>
            </v-col>
            <v-dialog v-model="warningFlag">
                <v-card>
                    <v-card-title>Are you sure you want to delete "{{ section.name }}"</v-card-title>
                    <v-card-actions>
                        <v-btn @click="deleteSection(section._id)">yes</v-btn>
                        <v-btn @click="warningFlag=false">no</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="submitFlag">
                <v-card>
                    <v-card-title>Submit Edits to:  "{{ newSection.name ? newSection.name : section.name}}" ?</v-card-title>
                        <displaySection :section="newSection" :flag="false"/>
                    <v-card-actions>
                        <v-btn @click="submitEdits()">yes</v-btn>
                        <v-btn @click="submitFlag=false">no</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-col v-if="addSuggestedFlag || addIngrFlag">
                <v-card>
                    <v-card-title>Add Items</v-card-title>
                    <v-card-item>
                        <div v-if="addSuggestedFlag">
                            To default <br/>
                            <v-chip
                                v-for="(item,i) in items"
                                :key="i"
                                @click="addSuggested(item)"
                            >
                                {{ item.name }}
                            </v-chip>
                        </div>
                        <div v-if="addIngrFlag">
                            To possible options <br/>
                            <v-chip
                                v-for="(item,i) in items"
                                :key="i"
                                @click="addIngr(item)"
                            >
                                {{ item.name }}
                            </v-chip>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default{
    props:{
        items:{
            type: Array,
            required: true
        },
        menus:{
            type: Array,
            required: true
        },
        section: {
            type: Object,
            required: true
        },
        sections: {
            type: Array,
            required: true
        }
    },
    data(){
        return{
            warningFlag: false,
            submitFlag: false,
            newSection: {
                name: '',
                _id: '',
                choice: null,
                suggested: [],
                ingr: [],
            },
            addIngrFlag: false,
            addSuggestedFlag: false,
        }
    },
    methods: {
        addSuggestedFlagFunc(){
            if(this.section.suggested.length){
                this.section.suggested.forEach((item)=>{
                    let contains = this.newSection.suggested.some(el=>el._id===item._id);
                    if(!contains){
                        const itemHolder={...item};
                        this.newSection.suggested.push(itemHolder);
                    }
                })
            }
            this.addSuggestedFlag=!this.addSuggestedFlag;
        },
        addIngrFlagFunc(){
            if(this.section.ingr.length){
                this.section.ingr.forEach((item)=>{
                    let contains = this.newSection.ingr.some(el=>el._id===item._id);
                    if(!contains){
                        const itemHolder={...item};
                        this.newSection.ingr.push(itemHolder);
                    }
                })
            }
            this.addIngrFlag=!this.addIngrFlag;
        },
        async deleteSection(id){
            if(this.warningFlag===true){
                const res = await useFetch('/api/sections/'+id, {
                    method: 'DELETE'
                })   
            }
            this.warningFlag=false;
            this.$router.push('/editMenu/sections')

        },
        async submitEdits(){
            const holder = {
                name: this.newSection.name ? this.newSection.name : this.section.name,
                choice: this.newSection.choice ? this.newSection.choice : this.section.choice,
                suggested: this.newSection.suggested.length ? this.newSection.suggested : this.section.suggested,
                ingr: this.newSection.ingr.length ? this.newSection.ingr : this.section.ingr,
            }
            const section_id = this.section._id;
            const res = await useFetch('/api/sections/'+section_id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            })
            this.items.forEach(item=>{
                let opIndex = item.options.findIndex(option=>option._id===section_id);
                if(!(opIndex<0)){
                    item.options[opIndex] = holder;
                    this.updateItemOption(item)
                }
            })
            this.menus.forEach(menu=>{
                let secIndex = menu.sections.findIndex(sec=>sec._id===section_id);
                if(!(secIndex<0)){
                    menu.sections[secIndex] = holder;
                    this.updateMenuSection(menu)
                }
            })
            this.submitFlag=false;
            this.$router.push('/editMenu/sections')
        },
        async updateMenuSection(menu){
            const res = await useFetch('/api/menus/'+menu._id,{
                method: 'PUT',
                body: JSON.stringify(menu)
            })
            console.log(res)
        },
        async updateItemOption(item){
            const holder = {...item}
            await useFetch('/api/items/'+item._id, {
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
        },
        async updateSectionsWItem(section){
            const holder={...section}
            await useFetch('/api/sections/'+section._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            })
        },
        addIngr(item){
            if(this.newSection.ingr.length){
                this.newSection.ingr.push(item)
            }
            else{
                if(this.section.ingr.length){
                    this.section.ingr.forEach((ingr)=>{
                        this.newSection.ingr.push(ingr)
                    })
                }
                this.newSection.ingr.push(item)
            }
        },
        addSuggested(item){
            if(this.newSection.suggested.length){
                this.newSection.suggested.push(item)
            }
            else{
                if(this.section.suggested.length){
                    this.section.suggested.forEach((ingr)=>{
                        this.newSection.suggested.push(ingr)
                    })
                }
                this.newSection.suggested.push(item)
            }
        },
    }
}
</script>
