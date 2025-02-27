﻿import axios from "axios";
import store from '@/store'; // Internationalization
import Router from "@/router";
import i18n from "@/locale";
import Swal from "sweetalert2";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
// const serverAddress = "https://api.nimkatiha.com";
const baseUrl = serverAddress + '/api/enduser/';
axios.defaults.baseURL = baseUrl;
export default {
    install(app) {
        let lastRequest;
        axios.interceptors.response.use(async (response) => {
            store.dispatch('hideLoading').then()
            // Vue.prototype.hideLoader();
            if (lastRequest.method.toString() === 'delete') {
                if (lastRequest.toast != false) {
                    // Vue.prototype.$toast.success(i18n.t('ui.deleteItemSuccess'));
                }
            }
            return response.data;
        }, async error => {
            store.dispatch('hideLoading').then()
            if (!error.response) {
                Swal.fire({
                    title: "خطا",
                    html: 'دسترسی به شبکه وجود ندارد!',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: 'تلاش مجدد',
                }).then(() => {
                    preparseAuthorization(error.config)
                });
                return;
            }

            if (lastRequest.method.toString() === 'delete') {
                if (lastRequest.errorToastMessage != false) {
                    // Vue.prototype.$toast.error(i18n.t('ui.deleteItemFailed'));
                }
            }
            const errorObject = error.response.data;
            const statusCode = error.response.status;
            let message = '';
            switch (statusCode) {
                case 400: {
                    message = errorObject.message;
                    break;
                }
                case 401: {
                    const currentRoute = Router.currentRoute;
                    if (currentRoute.value.fullPath !== '/auth' && !['/profile/complete', '/profile/test', '/test', '/survey/'].includes(currentRoute.value.fullPath)) {
                        localStorage.removeItem('accessToken');
                        /* await Router.push({
                             path: '/profile/complete',
                             query: {
                                 // redirectTo: currentRoute.value.fullPath
                                 redirectTo: '/profile/test'
                             }
                         });*/
                    }
                    message = errorObject.message;
                    if (['TOKEN_EXPIRED'].includes(errorObject.error)) {
                        lastRequest.errorModal = false;
                    }
                    break;
                }
                case 404: {
                    lastRequest.errorModal = false;

                    break;
                }
                case 500: {
                    message = i18n.global.t('errors.serverError');
                    break;
                }
                default: {
                    if (Array.isArray(errorObject.message)) {
                        errorObject.message.map((f) => {
                            message += f + `<br>`;
                        });
                    } else {
                        message = errorObject.message;
                    }
                    if (lastRequest.errorModal !== undefined && lastRequest.errorModal !== false) {
                        Swal.fire({
                            title: "خطا", html: message, icon: 'error',
                        });
                    }
                    break;
                }
            }
            if (lastRequest.errorModal != false) {
                Swal.fire({
                    title: "خطا",
                    html: message,
                    confirmButtonText: 'تأیید',
                    icon: 'error'
                });
            }

            return Promise.reject(error);
        });
        axios.interceptors.request.use(async (req) => {
            if (req.loader !== false) {
                store.dispatch('showLoading').then()
            }
            lastRequest = req;
            preparseAuthorization(req);
            return req;
        });
        app.config.globalProperties.serverAddress = serverAddress;
        app.config.globalProperties.baseUrl = baseUrl;
        app.config.globalProperties.httpGet = (requestUrl, successCallback, errorCallback) => {
            axios.get(requestUrl).then(response => {
                store.dispatch('hideLoading').then()
                successCallback(response);
            }).catch(error => {
                store.dispatch('hideLoading').then()
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        }
        app.config.globalProperties.httpPost = (requestUrl, body, successCallback, errorCallback) => {
            axios.post(requestUrl, body).then(response => {
                successCallback(response);
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        }
        app.config.globalProperties.httpPut = (requestUrl, body, successCallback, errorCallback) => {
            axios.put(requestUrl, body).then(response => {
                successCallback(response);
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        }


    }
}


function preparseAuthorization(req) {
    req.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    req.headers.sessionId = store.getters.sessionId;
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
// Vue.prototype.httpDelete = (requestUrl, successCallback, errorCallback) => {
//     const item = Vue.prototype.deleteModal.show();
//     item.then(res => {
//         if (res == false)
//             return;
//         Vue.prototype.http.delete(requestUrl).then(response => {
//             successCallback(response);
//         }).catch(error => {
//             if (errorCallback) {
//                 errorCallback(error)
//             }
//         })
//     })
// }
