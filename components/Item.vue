<template>
  <v-container>
    <v-row>
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
        <v-card-title>{{item.name}}</v-card-title>
        <v-card-text class="text--primary">
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