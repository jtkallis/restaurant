<template>
        <v-app>
            <v-app-bar app>
                <v-btn to="/">Home</v-btn>
                <v-btn to="/createOrder">Order</v-btn>
                <v-btn to="/menu">Menu</v-btn>
                <v-btn to="/editMenu">Edit Menu</v-btn>
            </v-app-bar>
            <v-main app>
                <NuxtPage/>
            </v-main>
            <v-footer app>
                <span id="footer">John Kallis website</span>
            </v-footer> 
        </v-app>
</template>
<style scoped>
#footer {
  overflow: auto;
  font-size: 12px;
}
</style>