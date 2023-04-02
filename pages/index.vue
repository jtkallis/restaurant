<template>
  <v-card>
      <v-card-title id="restaurant-name">Restaurant Home Page</v-card-title>
      <v-card-item>
        /Menu page displays all of the menus
      </v-card-item>
      <v-card-item>
        /Order displays only the menu available at a given time
      </v-card-item>
      <v-card-item>
        /editMenu allows for edits to the menu
      </v-card-item>
      <v-card-ite>
        Menu Items are of this structure
        {
          name: "Steak",
          price: 0,
          description: "",
          section_id: "",
          options: ["temperatures","sides"]
        }
        where sides contains an array of items that also have an options array value.
        the second modal is nested in case sub items have options
      </v-card-ite>
  </v-card>
</template>
