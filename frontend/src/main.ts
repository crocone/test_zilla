
import { createApp } from './app'
// @ts-ignore
import * as NProgress from 'nprogress'
import './scss/styles.scss'

createApp().then(async (testApp) => {

    testApp.router.beforeEach(() => {
        NProgress.start()
    })
    testApp.router.afterEach(() => {
        NProgress.done()
    })

    // wait for the app to be ready
    await testApp.router.isReady()

    // finaly mount the app to the DOM
    testApp.app.mount('#app')
})
