import axios from 'axios'
import Swal from 'sweetalert2'
import type {App} from 'vue'
import {router} from '../router/index'
import {useStore} from "vuex";

const _serverAddress = import.meta.env.VITE_SERVER_ADDRESS
const store = useStore()
const baseUrl = _serverAddress + '/api/enduser'
export const serverAddress = _serverAddress
let lastRequest: any
const axiosInstance = axios.create({
    baseURL: baseUrl,
})
axiosInstance.interceptors.response.use(async (response) => {
    // store.dispatch('hideLoading')
    // Vue.prototype.hideLoader();

    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.toast != false) {

        }
    }
    return response.data
}, async error => {
    // Vue.prototype.hideLoader();
    if (!error.response) {
        Swal.fire({
            title: 'خطا',
            html: 'دسترسی به شبکه وجود ندارد!',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'تلاش مجدد',
        }).then(() => {
            // preparseAuthorization(error.config)
        })
        return
    }

    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.errorToastMessage != false) {

        }
    }
    const errorObject = error.response.data
    const statusCode = error.response.status

    let message = ''
    switch (statusCode) {
        case 400: {
            message = errorObject.message
            break
        }
        case 401: {

            if (router.currentRoute.value.fullPath !== '/login') {
                await router.push({
                    path: '/login',
                })
            }
            message = errorObject.message
            if (['TOKEN_EXPIRED'].includes(errorObject.error)) {
                lastRequest.errorModal = false
            }
            break
        }
        case 404: {
            lastRequest.errorModal = false

            break
        }
        case 500: {
            message = 'خطای سرور'
            break
        }
        default: {
            if (Array.isArray(errorObject.message)) {
                errorObject.message.map((f: any) => {
                    message += f + `<br>`
                })
            } else {
                message = errorObject.message
            }
            if (lastRequest.errorModal !== undefined && lastRequest.errorModal !== false) {
                Swal.fire({
                    title: 'خطا'
                    , html: message, icon: 'error',
                })
            }
            break
        }
    }
    if (lastRequest.errorModal != false) {
        Swal.fire({
            title: 'خطا', html: message, icon: 'error',
        })
    }

    return Promise.reject(error)
})

axiosInstance.interceptors.request.use(async (req) => {
    req.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
    }
    if (req['loader'] !== false) {
        // Vue.prototype.showLoader();
    }
    lastRequest = req
    // preparseAuthorization(req)
    return req
})
export default function (app: App) {
    app.config.globalProperties.serverAddress = _serverAddress
    app.config.globalProperties.baseUrl = baseUrl
}


function preparseAuthorization(req: any) {

}


// Vue.prototype.http = axios;


// Vue.prototype.httpPost = (requestUrl, body, successCallback, errorCallback) => {
//     Vue.prototype.http.post(requestUrl, body).then(response => {
//         successCallback(response);
//     }).catch(error => {
//         if (errorCallback) {
//             errorCallback(error)
//         }
//     })
// }
// Vue.prototype.httpPut = (requestUrl, body, successCallback, errorCallback) => {
//     Vue.prototype.http.put(requestUrl, body).then(response => {
//         successCallback(response);
//     }).catch(error => {
//         if (errorCallback) {
//             errorCallback(error)
//         }
//     })
// }
export const httpGet = (requestUrl: string, successCallback: any, errorCallback: any) => {
    axiosInstance.get(requestUrl).then(response => {
        // store.dispatch('hideLoading')
        successCallback(response)
    }).catch(error => {
        // store.dispatch('hideLoading')
        if (errorCallback) {
            errorCallback(error)
        }
    })
}
export const httpPost = (requestUrl: any, body: any, successCallback: any, errorCallback: any) => {
    axiosInstance.post(requestUrl, body).then(response => {
        successCallback(response)
    }).catch(error => {
        if (errorCallback) {
            errorCallback(error)
        }
    })
}
export const httpPut = (requestUrl: any, body: any, successCallback: any, errorCallback: any) => {
    axiosInstance.put(requestUrl, body).then(response => {
        successCallback(response)
    }).catch(error => {
        if (errorCallback) {
            errorCallback(error)
        }
    })
}

export const httpDelete = (requestUrl, successCallback, errorCallback) => {
    store.showDeleteModal((status) => {
        if (status === true) {
            axiosInstance.delete(requestUrl).then(response => {
                successCallback(response)
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        }
    })

}

