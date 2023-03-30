<template>
    <div>
        <editItem
            :theItems="items"
            :sections="sections"
            :theItem="items.find(item=>item._id===route.params.item_id)"
        />
    </div>
</template>
<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: items } = await useFetch("/api/items");
const route = useRoute();
</script>