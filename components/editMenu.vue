<template>
    <v-card>
        <v-card-item>
            {{ menu.name }}<br/>
            <v-text-field
                v-model=newMenu.name
                label="new name"
            />
        </v-card-item>
        <v-card-item>
            {{ menu.hours }}<br/>
            <v-text-field
                v-model=newMenu.hours
                label="new hours"
            />
        </v-card-item>
        <v-card-item>
            Days:  <v-icon icon="mdi-account-edit" @click="editDays()"/>
            <template v-if="newMenu.days.length">
                <v-chip v-for="(day,i) in newMenu.days" :key="i">
                    {{ day }} <v-icon icon="mdi-close" @click="newMenu.days.splice(i,1)"/>                
                </v-chip>
            </template>
            <template v-else-if="menu.days.length">
                <v-chip v-for="(day,i) in menu.days" :key="i">
                    {{ day }}                
                </v-chip>
            </template>
        </v-card-item>
        <v-card-item v-if="daysFlay">
            Add days: <br/>
            <v-chip
                v-for="(day,i) in days"
                :key="i"
                @click="newMenu.days.push(day),days.splice(i,1)"
            >{{ day }}</v-chip>
        </v-card-item>
        <v-card-item>
            Sections:  <v-icon icon="mdi-account-edit" @click="sectionsFlag=true"/>
            <template v-if="newMenu.sections.length">
                <v-chip v-for="(section,i) in newMenu.sections" :key="i">
                    {{ section.name }} <v-icon icon="mdi-close" @click="newMenu.sections.splice(i,1)"/>                
                </v-chip>
            </template>
            <template v-else>
                <template v-if="menu.sections">
                    <v-chip v-for="(section,i) in menu.sections" :key="i">
                        {{ section.name }}                
                    </v-chip>
                </template>
            </template>
        </v-card-item>
        <v-card-item v-if="sectionsFlag">
            Add sections: <br/>
            <v-chip
                v-for="(section,i) in sections"
                :key="i"
                @click="newMenu.sections.push(section),sections.splice(i,1)"
            >{{ section.name }}</v-chip>
        </v-card-item>
        <v-dialog v-model="submitFlag">
            <v-card>
                <v-card-title>Are you sure you want to submit changes?</v-card-title>
                <v-btn @click="submitMenu()">Yes</v-btn>
                <v-btn @click="cancelEdit()">No</v-btn>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteFlag">
            <v-card>
                <v-card-title>Are you sure you want to delete {{menu.name}} ?</v-card-title>
                <v-btn @click="deleteMenu()">Yes</v-btn>
                <v-btn @click="deleteFlag=false">No</v-btn>
            </v-card>
        </v-dialog>
        <v-card-actions>
            <v-btn @click="deleteFlag=true">Delete Menu</v-btn>
            <v-btn @click="submitFlag=true">Submit Changes</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props:{
        menu:{
            type: Object,
            required: true
        },
        sections:{
            type: Array,
            required: true
        }
    },
    data(){
        return{
            daysFlag:false,
            sectionsFlag: false,
            submitFlag: false,
            deleteFlag: false,
            newMenu: {
                name: '',
                hours: '',
                sections: [],
                days: [],
            },
            days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']  
        }
    },
    methods: {
        editDays(){
            if(!newMenu.days.length){
                if(this.menu.days.length){

                    this.menu.days.forEach((day,i)=>{
                        this.newMenu.days.push(day)
                        this.menu.days.splice(i,1)
                    })
                }                
            }
            this.daysFlag=true;
        },
        editSections(){
            if(!newMenu.sections.length){
                if(this.menu.sections.length){
                    this.menu.sections.forEach((section)=>{this.newMenu.sections.push({...section})})
                }                
            }
            this.sectionsFlag=true;
        },
        cancelEdit(){
            this.newMenu=null;
            this.$router.push({path:'/editmenu/menus',});
        },
        async submitMenu(){
            console.log(this.menu)
            console.log(this.newMenu)
            const holder = {
                name: this.newMenu.name ? this.newMenu.name : this.menu.name,
                hours: this.newMenu.hours ? this.newMenu.hours : this.menu.hours,
                days: this.newMenu.days ? this.newMenu.days : this.menu.days,
                sections: this.newMenu.sections.length ? this.newMenu.sections : this.menu.sections
            }
            const res = await useFetch('/api/menus/'+this.menu._id, {
                method: 'PUT',
                body: JSON.stringify(holder)
            });
            console.log(res)
            this.$router.push({path:'/editMenu/menus',})

        },
        async deleteMenu(){
            const res = await useFetch('/api/menus/'+this.menu._id, {
                method: 'DELETE'
            });
            console.log('delete',res)
            this.$router.push({path:'/editMenu/menus',})
        }
    }
}
</script>
