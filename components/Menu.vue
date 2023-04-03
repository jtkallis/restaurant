<template>
  <v-container>
      <v-card>
          <v-tabs v-model="tab">
            <v-tab
                v-for="menu in findDoubles(menus)"
                :key=menu._id
            >
                {{menu.name}}
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item
                v-for="menu in findDoubles(menus)"
                :key="menu._id"
            >
                <Section
                    :theMenu="menu.sections"
                    :items="items"
                />
            </v-window-item>
        </v-window>
      </v-card>
  </v-container>
</template>
<script>
 export default {
    props:{
        items:{
            type: Array,
            required: true
        },
        menus:{
            type: Array,
            required: true
        },
        sections:{
            type: Array,
            required: true
        }
    },
    data(){
        return {
            tab:null
        }
    },
    methods:{
        findDoubles(menus){
            let noDoubles=[];
            menus.forEach(menu=>{
                if(!noDoubles.some(item=>item.name===menu.name)){
                    noDoubles.push(menu)
                }
            });
            return noDoubles;
        }
    }
}
</script>