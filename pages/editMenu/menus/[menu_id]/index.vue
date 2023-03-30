<template>
    <div>
        <editMenu
            :sections="sections"
            :menu="menus.find(menu=>menu._id===route.params.menu_id)"
        />
    </div>
</template>
<script setup>
const { data: sections } = await useFetch("/api/sections");
const { data: menus } = await useFetch("/api/menus");
const route = useRoute();
</script>