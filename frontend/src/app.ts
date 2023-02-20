import {createApp as createClientApp, h, Suspense} from 'vue'
import {createApi} from "./composable/useApi";
import {createPinia} from 'pinia'
import { createRouter } from './router'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import * as ConfirmDialog from 'vuejs-confirm-dialog'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit, faSave,faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add({faTrash, faEdit, faSave, faMoneyBill});
export type TestAppContext = Awaited<ReturnType<typeof createApp>>
export type TestPlugin = (testapp: TestAppContext) => void | Promise<void>
const plugins = import.meta.glob<{ default: TestPlugin }>('./plugins/*.ts', {
    eager: true,
})
// import '/@src/scss/styles.scss'
export function definePlugin(plugin: TestPlugin) {
    return plugin
}




export async function createApp() {
    const app = createClientApp(App)
    const router = createRouter()
    const api = createApi()
    const pinia = createPinia()

    app.use(pinia)
    app.use(Notifications)
    app.use(ConfirmDialog)
    const testapp = {
        app,
        api,
        router,
        pinia,
    }
    app.component("font-awesome-icon", FontAwesomeIcon)
    app.provide('testapp', testapp)

    for (const path in plugins) {
        try {
            const { default: plugin } = plugins[path]
            await plugin(testapp)
        } catch (error) {
            console.error(`Error while loading plugin "${path}".`)
            console.error(error)
        }
    }

    // use router after plugin registration, so we can register navigation guards
    app.use(testapp.router)

    return testapp
}

