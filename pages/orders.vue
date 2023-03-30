<script setup>
const { data: orders } = await useFetch("/api/orders");
</script>
<template>
    <v-card>
        <v-card
            v-for="(order,i) in orders"
            :key="i"
            class="overflow-auto"
        >{{ i+1 +"). "}}
        <v-card-item>id: {{ order._id }}</v-card-item>
        <v-card-title> {{ order.name }}</v-card-title>
        <v-card-item>Total: {{ order.total }}</v-card-item>
        <v-card-item>Phone: {{ order.phone }}</v-card-item>
        <v-card-item>Notes: {{ order.notes }}</v-card-item>
        <v-card-item class="overflow-auto">message: {{ order.message }}</v-card-item>
        Items: 
        <v-card-item
            v-for="(item,j) in order.order"
            :key="j"
        >
           <v-card-title> {{ (j+1) + "). "}} {{ item.name }} -- ${{ item.price/100 }}</v-card-title>
        </v-card-item>
        <v-divider/>
        </v-card>
    </v-card>
</template>