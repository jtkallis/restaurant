<script setup>
const { data: menus } = await useFetch("/api/menus");
</script>
<template>
    <v-card>
        <v-btn @click="newFlag=!newFlag,showFlag=false">Add new Menu</v-btn>
        <template v-if="newFlag">
            <newMenu :sections="sections" :menus="menus" /> 
        </template>
        <v-btn @click="showFlag=!showFlag,newFlag=false">View All Menus</v-btn>
        <template v-if="showFlag">
            <v-card-item v-for="(menu,i) in menus" :key="i">
                <displayMenu :menu="menu" :flag="true"/>
            </v-card-item>
        </template>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            newFlag: false,
            showFlag: false,
            newMenu: {
                name: '',
                hours: '',
                days: [],
                sections: []
            },
            days : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        }
    },
    methods: {
        daysLeft(){
            let whatsLeft = this.days.filter(item => !this.newMenu.days.includes(item));
            return whatsLeft;
        }
    }
}
</script>