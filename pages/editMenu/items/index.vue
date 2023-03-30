<template>
    <v-card>        
        <v-btn @click="newFlag=!newFlag">Add new Item</v-btn>
        <template v-if="newFlag">
            <newItem :sections="sections"/>
        </template>
        <v-btn @click="showFlag = !showFlag">View All Items</v-btn>
        <template v-if="showFlag">
            <v-card>
                <v-row>
                    <v-col
                        cols="12"
                        sm="4"
                        v-for="(item,i) in items" :key="i"
                    >
                        <displayItem :item="addSection(item,sections)"/>
                    </v-col>
                </v-row>
            </v-card>
        </template>
    </v-card>
</template>
<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: items } = await useFetch("/api/items");
</script>
<script>
export default{
    data(){
        return{
            showFlag: false,
            newFlag: false,
        }
    },
    methods:{
        addSection(item,sections){
            const x = sections.find((section)=>section._id===item.section_id);
            item.section = {
                name: x.name ? x.name : '',
                _id: x._id ? x._id : ''
            }
            if(item.options.length){
                item.options.forEach((option,i)=>{
                    if(!option._id){
                        const y = sections.find((section)=>section._id === option);
                        item.options[i]={
                            name:y.name ? y.name : '',
                            _id:y._id ? y._id : ''
                        };                       
                    }
                })
            }
            return item;
        }
    }
}
</script>