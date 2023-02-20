// @ts-ignore
import { createRouter as createClientRouter, createWebHistory, setupDataFetchingGuard } from 'vue-router/auto'

export function createRouter() {
    const router = createClientRouter({
        history:  createWebHistory(),
    })

    setupDataFetchingGuard(router)

    return router
}
