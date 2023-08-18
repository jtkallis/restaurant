import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    githubClient: process.env.GITHUB_CLIENT_ID,
    githubSecert: process.env.GITHUB_SECERET
  },
  css: ['@/assets/css/main.css','vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
});