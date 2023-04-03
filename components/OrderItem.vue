<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                v-for="(item,i) in theItems"
                :key="i"
                cols="12"
                sm="4"
            >
                <v-card @click="$emit('passToMenu', item)" width="100%" height="100%" tile variant="outlined" id="card2">  
                    <v-card-title id="item-name">{{ item.name }}</v-card-title>    
                    <v-card-subtitle>${{item.price/100}}</v-card-subtitle>
                    <v-card-text v-if="item.description">{{item.description}}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
const props = defineProps({
    theItems:{
            type: Array,
            required: true
        }
});
</script>
<style>
#item-name {
    font-family:'Times New Roman', Times, serif;
    -webkit-text-stroke: 1px darkgreen;
    font-weight: 300;
    color: white;
}
#card2 {
    background-color: white;
}
</style>