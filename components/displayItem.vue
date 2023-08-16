<template>
    <v-card height="100%">
        <v-card-title v-if="item.name">{{ item.name }}</v-card-title>
        <v-card-item v-if="item.price">{{ formatter.format(item.price/100) }}</v-card-item>
        <v-card-item v-if="item.description">
        </v-card-item>
        <v-card-item>
            Menu Section: <v-chip>{{ item.section.name ? item.section.name : "no name"}}</v-chip>
        </v-card-item>
        <v-card-item v-if="item.options.length">
            Options:
           <v-chip
                v-for="(option,i) in item.options"
                :key="i"
           >
           {{ option.name }}
           </v-chip> 

        </v-card-item>
        <v-card-actions v-if="flag">
            <v-btn><NuxtLink :to="combineString()">edit item</NuxtLink></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
const props = defineProps({
    item:{
        type: Object,
        required: true
    },
    flag:{
        type: Boolean,
        required: false,
        default: true,
    }
});
const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
function combineString(){
    return "/editMenu/items/" + props.item._id;
}
</script>
