<template>
  <v-card>
    <Menu 
      :items="items"
      :menus="menus"
      :sections="sections"
    />
  </v-card>
</template>


<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: menus } = await useFetch("/api/menus");
const { data: items } = await useFetch("/api/items");
</script>
