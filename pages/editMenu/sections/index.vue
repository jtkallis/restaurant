<template>
     <v-card>
        <v-btn @click="newFlag=!newFlag">Add new Section</v-btn>
        <template v-if="newFlag">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-card-title>Create New Section</v-card-title>
                                <v-text-field
                                    v-model="newSection.name"
                                    label="name"
                                ></v-text-field>
                                <v-text-field
                                    v-model="newSection.choice"
                                    label="number of choices (optional)"
                                ></v-text-field>
                                <v-btn @click="addSuggestedFlagFunc()">add default items</v-btn>
                                <v-btn @click="addIngrFlagFunc()">add items that can be selected</v-btn>
                                <v-card-item>
                                    Default Items: <div>
                                        <v-chip
                                            v-for="(sug,j) in newSection.suggested"
                                            :key="j"
                                        >
                                            {{ sug.name }}
                                            <v-icon v-if="addSuggestedFlag" icon="mdi-close" @click="newSection.suggested.splice(j,1)"/>
                                        </v-chip>
                                    </div>
                                </v-card-item>
                                <v-card-item>
                                    Items to choose from: <div>
                                        <v-chip
                                            v-for="(ingr,j) in newSection.ingr"
                                            :key="j"
                                        >
                                            {{ ingr.name }}
                                            <v-icon v-if="addIngrFlag" icon="mdi-close" @click="newSection.ingr.splice(j,1)"/>
                                        </v-chip>
                                    </div>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn @click="submitNewSection()">Submit New Section</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
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
                
            </v-container>
            </template>
        <v-btn @click="showFlag = !showFlag">View All Sections</v-btn>
        <template v-if="showFlag">
            <v-card-item v-for="(section,i) in sections" :key="i">
                <displaySection :section="section" :flag="true"/>
            </v-card-item>
        </template>
    </v-card>
</template>
<script setup>
const { data: items } = await useFetch("/api/items");
const { data: sections } = await useFetch("/api/sections");
</script>
<script>
export default {
    data(){
        return{
            newFlag: false,
            showFlag: false,
            addSuggestedFlag: false,
            addIngrFlag: false,
            newSection: {
                name: '',
                _id: '',
                choice: 0,
                suggested: [],
                ingr: []
            },    
        }
    },
    methods: {
        async submitNewSection(){
            const holder = {
                _id: this.newSection._id ? this.newSection._id : this.section_id,
                name: this.newSection.name ? this.newSection.name : this.section.name,
                choice: this.newSection.choice ? this.newSection.choice : 0,
                suggested: this.newSection.suggested ? this.newSection.suggested : [],
                ingr: this.newSection.ingr ? this.newSection.ingr : [],
            }
            const res = await useFetch('/api/sections', {
                method: 'POST',
                body: JSON.stringify(holder)
            })
            this.newFlag=false;
        },
        addSuggestedFlagFunc(){
            this.addSuggestedFlag=!this.addSuggestedFlag;
            this.addIngrFlag=false;
        },
        addIngrFlagFunc(){
            this.addIngrFlag = !this.addIngrFlag;
            this.addSuggestedFlag=false;
        },
        addSuggested(suggested){
            let x = this.newSection.suggested.filter((item)=>item._id===suggested._id);
            if(!x.length){ this.newSection.suggested.push(suggested) }
        },
        addIngr(ingr){
            let x = this.newSection.ingr.filter((item)=>item._id===ingr._id);
            if(!x.length){ this.newSection.ingr.push(ingr) }
        }
    }
}
</script>
