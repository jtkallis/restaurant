<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="item in items"
        :key="item._id"
        cols="12"
        sm="4"
      >
      <v-card
        class="mx-auto"
        height="100%"
        tile
      >
        <v-card-title id="item-name">{{item.name}}</v-card-title>
        <v-card-text>
          <div>${{item.price/100}}</div>
          <div>{{item.description}}</div>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const props = defineProps({
    items: {
            type: Array
        }
})
</script>
<style scoped>
#item-name {
  font-family:'Times New Roman', Times, serif;
  -webkit-text-stroke: 1px darkgreen;
  color: white;
}
</style>