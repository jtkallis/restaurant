<template>
    <v-card>
        <v-card-title>{{ menu.name }}</v-card-title>
        <v-card-item>
            Days: <br/>
            <v-chip
                v-for="(day,i) in menu.days"
                :key="i"
            >{{ day.day }} <br/>{{ day.startHour + ":" + day.startMin10 + day.startMin01 + day.start_pm+
        "-"+day.endHour+":"+day.endMin10+day.endMin01+day.end_pm}}</v-chip>
        </v-card-item>
        <v-card-item>
            Sections: <br/>
            <v-chip
                v-for="(section,i) in menu.sections"
                :key="i"
            >{{ section.name }}</v-chip>
        </v-card-item>
    </v-card>
</template>
<script setup>
const props = defineProps({
    menu:{
        type: Object,
        required: true
    },
    flag:{
        type: Boolean,
        required: false
    }
});
</script>
<script>
export default{
    methods:{
        editMenu(){
            this.$router.push({path: '/editmenu/menus/' + this.menu._id,})
        }
    }
}
</script>
