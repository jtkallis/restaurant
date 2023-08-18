<script setup>
const client = useSupabaseClient()
const logOut = async ()=>{
  const { user, err } = await client.auth.signOut()
  console.log(user, "logged out")
  console.log(err)

}
const user = useSupabaseUser()
onMounted(()=>{
  watchEffect(()=>{
    
    if(!user.value){
        console.log('logout')
        navigateTo('/')
    }
  })
})
</script>
<template>
        <v-app>
            <v-app-bar app>
                
                <v-btn to="/">Home</v-btn>
                <v-btn to="/createOrder">Order</v-btn>
                <v-btn to="/menu">Menu</v-btn>
                <v-btn to="/editMenu">Edit Menu</v-btn>
                
                <v-spacer></v-spacer>

                <v-btn @click="logOut">Logout</v-btn>
                <v-btn to="/login">Login</v-btn>
            </v-app-bar>
            <v-main app id="main">
                <NuxtPage/>
            </v-main>
            <v-footer app id="footer">
                <span id="footer-text">John Kallis websites jtkallis@gmail.com</span>
            </v-footer> 
        </v-app>
</template>
<style>
#footer {
    height: 25px;
}
#footer-text {
  overflow: auto;
  font-size: 12px;
  
}
#main {
    flex-grow: 1;
}
</style>