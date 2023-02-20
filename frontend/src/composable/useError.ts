export const formatError = (err: any) => {
    if (err.response?.status === undefined) {
        if (err.message == 'Network Error')
            return 'Connection error! Please try again later'
        else return err.message
    }

    let message
    switch (err.response?.status) {
        case 401:
            message = 'auth.errors.unauthenticated'

            break
        case 403:
            message = "You don't have the permission to see this page!"

            break
        case 422:
            message = Object.values<string>(err.response.data?.errors)?.flat()?.[0]

            break
        case 500:
            message = 'Internal error! Please try again later'

            break
    }
    return message
}