<template>
  <v-card>
      <v-card-title id="restaurant-name">Restaurant Home Page</v-card-title>
      <v-card-item
        v-for="(line,i) in pages"
        :key="i"
      >
       {{ pages[i] }}
      </v-card-item>
      <v-card>
        <v-card-item
          v-for="(item_line,i) in item_lines"
          :key="i" 
        >
          {{ item_lines[i] }}
        </v-card-item>

        
        
      </v-card>
  </v-card>
</template>
<script>
export default {
  data(){
    return{
      pages: [" /Menu page displays all of the menus",
      "/Order displays only the menu available at a given time. When an Item is selected a modal opens with a menu. after submit a text is sent to my cell phone with the order",
      " /editMenu allows for edits to the menu. when edit is made menu is searched for all occurances of the item "],
      item_lines: [
        "Menu Items are of this structure",
        "{",
        "name: Steak,",
        "price: 0,",
        " description: '', ",
          "section_id: '',",
          "options: ['temperatures','sides']",
          "}",
          "where sides contains an array of items that also have an options array value.",
          "the second modal is nested in-case side items have options",
          "when submitted the /api/orders post route sends a text message",
           "to my phone with the order and stores it in the database"
      ]
    }
  }
}
</script>
