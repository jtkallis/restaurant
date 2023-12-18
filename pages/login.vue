<script setup>
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
</script>
<template>
    <v-container>
        <v-card>
            <v-toolbar>
                <v-toolbar-title>User Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn to="/notes">register</v-btn>
            </v-toolbar>
            <v-card-text>
                <form ref="form" @submit.prevent="()=> (isSignUp ? signUp() : login())">
                    <v-text-field
                        v-model="email"
                        name="email"
                        label="email"
                        type="text"
                        placeholder="email"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        required
                    ></v-text-field>
                    <v-btn type="submit">
                      <span v-if="isSignUp">Sign Up</span>
                      <span v-else> Log in </span>
                    </v-btn>
                </form>
                <v-btn @click="isSignUp = !isSignUp">
                      <span v-if="isSignUp">have an account? log in instead</span>
                      <span v-else> Create a new account </span>
                    </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>