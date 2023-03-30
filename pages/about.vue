<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
  
  <p>Fiddler's Green opened its doors in 1994 as a family restaurant designed to be a place where the community rallies together, whether it be a post race, or a nice dinner with family and friends around the fire bar. 

Fiddler's Green interior is sure to excite even the most landlocked of travelers. With every boat, tree, or pirate having its own, local, and unique story.

Try our mouth watering Prime Rib or our crunchy Coconut Shrimp and see why Fiddler's Green has been a local staple for going on 20 years!!

Thank you for your support!

Thanks to our neighbors in Shelter Island, Harbor Island, Ocean Beach

and of course Point Loma</p>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Nature',
          icon: 'mdi-nature',
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine',
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range',
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Biking',
          icon: 'mdi-bike',
        },
      ],
      selected: [],
    }),
    methods: {
      addSelection(item){
        this.selected.push(item)
      },
      removeSelection(i){
        this.selected.splice(i,1)
      }
    }
  }
</script>
