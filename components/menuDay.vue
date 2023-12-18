<script setup>
const props = defineProps({
    day:{
        type: Object,
        required: true
    }
});
</script>
<template>
    <v-card>
        <v-card hover :disabled="disableFlag">
            <v-card-title>{{ day.day }}</v-card-title>
            start time: {{ formatHour(day.start, day.start_pm) }}
            <v-switch v-model="day.start_pm" label="PM?"></v-switch>
            <v-slider
                step="1"
                min="1"
                max="12"
                show-ticks
                v-model="day.start"
            ></v-slider>
            end time: {{ formatHour(day.end, day.end_pm) }}
            <v-switch v-model="day.end_pm" label="PM?"></v-switch>
            <v-slider
                step="1"
                min="1"
                max="12"
                show-ticks
                v-model="day.end"
            ></v-slider>
            <v-card-actions>
                <v-btn @click="dialog=true">add day to schedule</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
            v-model="dialog"
        >
        <v-card>
            <v-card-text>
                day: {{ day.day }}
                time: {{ formatHour(day.start, day,start_pm) }} - {{ formatHour(day.end, day.end_pm) }}
            </v-card-text>
            <v-card-actions><v-btn @click="addToSched">
                correct
            </v-btn></v-card-actions>
        </v-card>
        </v-dialog>
        
</v-card>
</template>
<script>
export default {
    data(){
        return {
            disableFlag: false,
            dialog: false,
        }
    },
    methods: {
        addToSched(){
            console.log(this.day)
            this.dialog=false;
            this.disableFlag = true;
            this.$emit('passBack', this.day)
        },
        formatHour(hour, isPM){
            let time = "";
            time += hour;
            time += ":00 ";
            time += isPM ? "pm" : "am";
            return time; 

        },
    }
}
</script>