import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  },
  css: ['@/assets/css/main.css','vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
});