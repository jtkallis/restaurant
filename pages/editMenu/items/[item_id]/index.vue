<template>
    <div>
        <editItem
            :theItems="items"
            :sections="sections"
            :menus="menus"
            :theItem="items.find(item=>item._id===route.params.item_id)"
        />
    </div>
</template>
<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: items } = await useFetch("/api/items");
const { data: menus } = await useFetch("/api/menus");
const route = useRoute();
</script>