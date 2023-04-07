<template>
  <v-card>
      <v-expansion-panels variant="accordian">
          <v-expansion-panel 
            v-for="section in theMenu"
            :key="section._id"
            :title="section.name"
        >
              <v-expansion-panel-text>
                  <Item
                    :items="sectionItems(section)"
                  />
              </v-expansion-panel-text>
          </v-expansion-panel>
      </v-expansion-panels>
  </v-card>
</template>
<script setup>
const props = defineProps({
    theMenu: {
        type: Array
    },
    items: {
        type: Array
    }
})
</script>
<script>
export default {
    methods: {
        sectionItems(section){
            const theItems = []
            this.items.forEach(item =>{
                if(section._id === item.section._id){
                    item.section = section
                    theItems.push(item)
                }
            })
            return theItems
        },
    }
}
</script>