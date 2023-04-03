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
            const itemHolder={...item};
            const section = sections.find(section=>section._id===item.section_id);
            const sectionHolder = {...section}
            itemHolder.section = sectionHolder;
            if(itemHolder.options.length){
                itemHolder.options.forEach((option,i)=>{
                    if(typeof option === 'string'){
                        const sec = sections.find((section)=>section._id === option);
                        const secHolder = {...sec};
                        itemHolder.options[i]=secHolder;                     
                    }
                })
            }
            return itemHolder;
        }
    }
}
</script>