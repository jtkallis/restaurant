<template>
    <v-card>
        <v-card-item>
            <v-text-field
                v-model="newMenu.name"
                label="new name"
            />
            <v-text-field
                v-model="newMenu.start_hours"
                label="new hours"
            />
            <v-text-field
                v-model="newMenu.end_time"
                label="new hours"
            />
        </v-card-item>
        <v-card-item>
            Days: <br/>
            <v-chip
                v-for="(day,i) in newMenu.days"
                :key="i"
            >
                {{ day }}
                <v-icon icon="mdi-close" @click="newMenu.days.splice(i,1)"/>
            </v-chip>
        </v-card-item>
        <v-divider/>
        <v-card-item>
            Add Days: <br/>
            <v-chip
                v-for="(day,i) in days"
                :key="i"
                @click="newMenu.days.push(day),days.splice(i,1)"
            >{{ day }}</v-chip>
        </v-card-item>
        <v-card-item>
            Sections <br/>
            <v-chip
                v-for="(section,i) in newMenu.sections"
                :key="i"
            >
                {{ section.name }}
                <v-icon icon="mdi-close" @click="newMenu.sections.splice(i,1)"/>
            </v-chip>
        </v-card-item>
        <v-card-item>
            Add Sections: <br/>
            <v-chip
                v-for="(section,i) in sections"
                :key="i"
                @click="addSection(section)"
            >
                {{ section.name }}
            </v-chip>
        </v-card-item>
        <v-card-actions>
            <v-btn @click="submitMenu()">submit</v-btn>
            <v-btn @click="cancel()">cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
const props = defineProps({
    menus: {
        type: Array,
        required: true
    },
    sections: {
        type: Array,
        required: true
    }
})
</script>
<script>
export default{
    data(){
        return{
            newMenu:{
                _id: '',
                name: '',
                start_time: '',
                end_time: '',
                days: [],
                sections: []
            },
            days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        }
    },
    methods:{
        addSection(section){
            const sectionHolder={
                name: section.name ? section.name : '',
                _id: section._id ? section._id : '',
                choice: section.choice ? section.choice : 0,
                suggested: section.suggested.length ? section.suggested:[],
                ingr: section.ingr.length ? section.ingr : [],
            }
            this.newMenu.sections.push({sectionHolder})
        },
        cancel(){
            newMenu=null;
            this.$router.push({path:'/editMenu/',})
        },
        async submitMenu(){
            const holder = {
                name: this.newMenu.name ? this.newMenu.name : '',
                hours: this.newMenu.hours ? this.newMenu.hours : 0,
                sections: this.newMenu.sections.length ? this.newMenu.sections : [],
                days: this.newMenu.days ? this.newMenu.days : []
            }
            const res = await useFetch('/api/menus', {
                method: 'POST',
                body: JSON.stringify(holder)
            })
            this.$router.push({path:'/editMenu/',})
        },
    }
}
</script>