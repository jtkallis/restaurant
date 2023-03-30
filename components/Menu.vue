<template>
  <v-container>
      <v-card>
          <v-tabs v-model="tab">
            <v-tab
                v-for="menu in menus"
                :key=menu._id
            >
                {{menu.name}}
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item
                v-for="menu in menus"
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

<script setup>
const props = defineProps({
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
});
</script>
<script>
 export default {
    data(){
        return {
            tab:null
        }
    }
}
</script>