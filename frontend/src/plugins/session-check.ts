import { definePlugin } from '../app'
import { useUserSession } from '../stores/userSession'


export default definePlugin(async ({ router, api, pinia }) => {
    const userSession = useUserSession(pinia)
    if (userSession.isLoggedIn) {
        try {
            const { data: user } = await api.get('/api/user')
            userSession.setUser(user)
        } catch (err) {
            userSession.logoutUser()
        }
    }

    // @ts-ignore
    router.beforeEach((to) => {
        if (to.fullPath == '/' && !userSession.isLoggedIn) {
             return {
                name: '/auth/login',
                query: { redirect: to.fullPath },
            }
        }
    })
})