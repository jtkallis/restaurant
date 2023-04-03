<template>
        <v-layout>
            <v-app-bar>
                <v-btn to="/">Home</v-btn>
                <v-btn to="/createOrder">Order</v-btn>
                <v-btn to="/menu">Menu</v-btn>
                <v-btn to="/editMenu">Edit Menu</v-btn>
            </v-app-bar>
            <v-main>
                <NuxtPage/>
            </v-main>
            <v-footer>
                <span id="footer">John Kallis website</span>
            </v-footer> 
        </v-layout>
</template>
<style scoped>
#footer {
  overflow: auto;
  font-size: 12px;
}
</style>