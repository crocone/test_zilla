import axios, {type RawAxiosRequestHeaders, type AxiosInstance} from 'axios'

import {useUserSession} from '../stores/userSession'

let api: AxiosInstance

export function createApi() {
    // Here we set the base URL for all requests made to the api
    api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })

    // We set an interceptor for each request to
    // include Bearer token to the request if user is logged in
    api.interceptors.request.use(
        (config) => {
            const userSession = useUserSession()
            userSession.setLoading(true)
            if (userSession.isLoggedIn) {
                // @ts-ignore
                config.headers = {
                    ...((config.headers as RawAxiosRequestHeaders) ?? {}),
                    Authorization: `Bearer ${userSession.token}`,
                }
            }

            return config
        },
        (err) => {
            return Promise.reject(err)
        },
    )

    api.interceptors.response.use(
        function (response) {
            const userSession = useUserSession()
            userSession.setLoading(false)
            return response;
        }, function (error) {
            const userSession = useUserSession()
            userSession.setLoading(false)
            return Promise.reject(error);
        })
    return api
}

export function useApi() {
    if (!api) {
        createApi()
    }
    return api
}