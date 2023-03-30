<template>
    <v-card>
        <v-row>
            <v-col>
                <v-card-item>
                    {{ getSection().name }}
                    <v-text-field
                        v-model="newSection.name"
                        label="new name"
                    />
                    Number of Choices: {{ section.choice }}
                    <v-text-field
                        v-model="newSection.choice"
                        label="new number"
                    />
                </v-card-item>
                <v-card-item>
                    Original Default Items: 
                    <v-chip
                        v-for="(suggested,i) in section.suggested"
                        :key="i"
                    >{{ suggested.name }}</v-chip>
                    <v-btn @click="addSuggestedFlag=!addSuggestedFlag"><v-icon icon="mdi-account-edit"/></v-btn>
                </v-card-item>
                <v-card-item v-if="addSuggestedFlag">
                    New Default Items:
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
            const res = await useFetch('/api/sections/'+this.section._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            })
            this.submitFlag=false;
            this.$router.push('/editMenu/sections')
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
