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
<template>
    <v-card>
        <v-card-item>
            <v-text-field
                v-model="newMenu.name"
                label="new name"
            />
            
        </v-card-item>
        <v-card-item title="Add Days:">
            <template v-if="newMenu.days.length">
                <v-list>
                    <v-list-item v-for="(day, i) in newMenu.days" :key="i">
                        {{ day.day +"  "+ day.startHour + ":" +day.startMin10 + day.startMin01 + day.start_pm +
                        " - " + day.endHour + ":" + day.endMin10 + day.endMin01 + day.end_pm}}
                    </v-list-item>
                </v-list>

            </template>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">{{ newDay.day }}</v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(day, i) in days"
                        :key="i"
                        :value="day"
                    >
                    <v-list-item-title @click="addDay(day, i)">{{ day }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <template v-if="dayFlag">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.startHour }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(i) in 12"
                            :key="i"
                            :value="i"
                        >
                        <v-list-item-title @click="newDay.startHour=i">{{ i }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>:
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.startMin10 }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="( i) in 6"
                            :key="i"
                            :value="i-1"
                        >
                        <v-list-item-title @click="newDay.startMin10=i-1">{{ i-1 }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.startMin01 }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="( i) in 10"
                            :key="i"
                            :value="i-1"
                        >
                        <v-list-item-title @click="newDay.startMin01=i-1">{{ i-1 }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.start_pm }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(val, i) in amPM"
                            :key="i"
                            :value="i"
                        >
                        <v-list-item-title @click="newDay.start_pm=val">{{ val }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>--
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.endHour }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(i) in 12"
                            :key="i"
                            :value="i"
                        >
                        <v-list-item-title @click="newDay.endHour=i">{{ i }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>:
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.endMin10 }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="( i) in 6"
                            :key="i"
                            :value="i-1"
                        >
                        <v-list-item-title @click="newDay.endMin10=i-1">{{ i-1 }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.endMin01 }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="( i) in 10"
                            :key="i"
                            :value="i-1"
                        >
                        <v-list-item-title @click="newDay.endMin01=i-1">{{ i-1 }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">{{ newDay.end_pm }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(val, i) in amPM"
                            :key="i"
                            :value="i"
                        >
                        <v-list-item-title @click="newDay.end_pm=val">{{ val }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                
                <v-btn @click="dayDialog=true">ADD Day to menu</v-btn>
            </template>
            <v-dialog v-model="dayDialog">
                <v-card>
                    <v-card-title>{{ newDay.day }}</v-card-title>
                    <v-card-subtitle>
                        {{ newDay.startHour +":"+ newDay.startMin10 + newDay.startMin01 + newDay.start_pm + " - " +
                        newDay.endHour + ":" + newDay.endMin10 + newDay.endMin01 + newDay.end_pm }}
                    </v-card-subtitle>
                <v-btn @click="addNewDay(newDay);dayDialog=!dayDialog">add day</v-btn>
                <v-btn @click="dayDialog=!dayDialog">Cancel</v-btn>
            </v-card>
                
            </v-dialog>
        </v-card-item>


        <v-divider/>
        
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
<script>
export default {
    data(){
        return{
            dayFlag: false,
            dayDialog: false,
            newMenu:{
                _id: '',
                name: '',
                days: [],
                sections: []
            },
            newDay: {
                day: 'day',
                day_id: 0,
                startHour: "0",
                startMin10: "0",
                startMin01: "0",
                start_pm: "am",
                endHour: "0",
                endMin10: "0",
                endMin01: "0",
                end_pm: "am",
            },
            amPM: ['am', 'pm'],
            days: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
        }
    },
    methods:{
        addDay(day, index){
            console.log(day)
            console.log(index)
            const holder = {
                day: day,
                _id: index
            }
            this.newDay.day=holder.day;
            this.newDay.day_id=holder._id;
            this.dayFlag=true;
        },
        addNewDay(day){
            const holder = {
                day: day.day,
                day_id: day.day_id,
                startHour: day.startHour,
                startMin10: day.startMin10,
                startMin01: day.startMin01,
                start_pm: day.start_pm,
                endHour: day.endHour,
                endMin10: day.endMin10,
                endMin01: day.endMin01,
                end_pm: day.end_pm,
            }
            this.newMenu.days.push(holder)
        },
        addSection(section){
            const sectionHolder={
                name: section.name ? section.name : '',
                _id: section._id ? section._id : '',
                choice: section.choice ? section.choice : 0,
                suggested: section.suggested.length ? section.suggested:[],
                ingr: section.ingr.length ? section.ingr : [],
            }
            console.log(sectionHolder)
            this.newMenu.sections.push(sectionHolder)
        },
        cancel(){
            newMenu=null;
            this.$router.push({path:'/editMenu/',})
        },
        async submitMenu(){
            const holder = {
                name: this.newMenu.name ? this.newMenu.name : '',
                sections: this.newMenu.sections.length ? this.newMenu.sections : [],
                days: this.newMenu.days.length ? this.newMenu.days : []
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