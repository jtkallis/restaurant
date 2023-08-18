export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()
  
    if (!user.value && to.path === '/editMenu') {
      return navigateTo('/editMenu')
    } else if (user.value && to.path === '/login') {
      return navigateTo('/editMenu')
    }
  })