<template>
        <v-app>
            <v-app-bar app>
                <v-btn to="/">Fid's</v-btn>
                <v-btn to="/createOrder">Order</v-btn>
                <v-btn to="/about">About</v-btn>
                <v-btn to="/events">Book an Event</v-btn>
                <v-btn to="/menu">Menu</v-btn>
                <v-btn to="/reservations">Reservations</v-btn>
                <v-btn to="/team">Our Team</v-btn>
                <v-btn to="/editMenu">Edit Menu</v-btn>
                <v-btn to="/login">Login</v-btn>
                <v-btn>LogOut</v-btn>
            </v-app-bar>
            <v-main app>
                <v-container>
                        <NuxtPage/>
                </v-container>
            </v-main>
            <v-footer id="footer" app>
                <span>Fiddle's Green, 2700 Shelter Island Dr, San Diego, CA, 92106 United States of America
                619-222-2216 fidsgreencatering@gmail.com</span>
            </v-footer> 
        </v-app>
</template>
<style scoped>
#footer {
  overflow: auto;
  font-size: 12px;
}
</style>