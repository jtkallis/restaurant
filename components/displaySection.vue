<template>
    <v-card>
        <v-card-title @click="editSection()">
            {{ section.name }}
            <v-icon v-if="flag" icon="mdi-account-edit"/>
        </v-card-title>
        <v-card-item>
            {{ section.choice }}
        </v-card-item>
        <v-card-item v-if="section.suggested.length">
            <v-chip
                v-for="(suggested,i) in section.suggested"
                :key="i"
            >{{ suggested.name }}</v-chip>
        </v-card-item>
        <v-card-item v-if="section.ingr.length">
            <v-chip
                v-for="(suggested,i) in section.suggested"
                :key="i"
            >{{ suggested.name }}</v-chip>
        </v-card-item>
    </v-card>
</template>
<script setup>
const props = defineProps({
    section:{
        type: Object,
        required: true
    },
    flag: {
        type: Boolean,
        required: true
    }
});
</script>
<script>
export default {
    data(){
        return{
            nameFlag: false,
            newSection: {
                name: '',
                choice: 0,
                suggested: [], //array of default items
                options: [], 
            }            
        }
    },
    methods: {
        removeSection(){
            this.section.req = "DELETE";
            this.$emit('sendBack', this.section)
        },
        editSection(){

            this.$router.push({path: '/editMenu/sections/'+this.section._id,})
        }

    }

}
</script>