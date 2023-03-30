<template>
    <v-card>
        <editSection :sections="sections" :items="items" :section="sections.find(section=>section._id===route.params.section_id)"/>
    </v-card>
</template>
<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: items } = await useFetch("/api/items");
const route = useRoute();
</script>

