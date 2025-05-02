import {useToast} from 'vue-toast-notification'
import PersianDate from 'persian-date'
import {App} from "vue";


const $toast = useToast()

let store;

let rules = []

export function getKeyValue(title, value) {
    return {title, value}
}

export function getPersianTime(time, format) {
    if (!format) {
        format = 'YYYY/MM/DD - HH:mm'
    }
    let date = new Date(time)
    date.setHours(date.getHours())
    date.setMinutes(date.getMinutes())
    return new PersianDate(date).format(format)
}

export const toastHandler = {
    isDeveloping() {
        $toast.info('درحال توسعه...', {
            position: 'bottom',
        })
    },

    updateSuccess() {
        $toast.success('بروزرسانی با موفقیت انجام شد.', {
            position: 'bottom',
        })
    },
    updateFailed() {
        $toast.success('بروزرسانی با خطا مواجه شد.', {
            position: 'bottom',
        })
    },

    addSuccess() {
        $toast.success('افزودن داده با موفقیت انجام شد.', {
            position: 'bottom',
        })
    },
    addFailed() {
        $toast.success('افزودن داده با خطا مواجه شد.', {
            position: 'bottom',
        })
    },
    failedToast(message) {
        $toast.error(message, {
            position: 'bottom',
        })
    },
}

export function checkPermission(keyOrKeys) {
    if (Array.isArray(keyOrKeys)) {
        const keys = keyOrKeys
        const hasNotValidKey = []
        keys.map(f => {
            if (!rules.includes(f)) {
                hasNotValidKey.push(false)
            } else {
                hasNotValidKey.push(true)
            }
        })
        return hasNotValidKey.includes(true)

    } else {
        return rules.includes(keyOrKeys)
    }
    console.log('rules', rules)
}

export default function (app: App) {
    store = app.config.globalProperties.$store;
    store.watch(() => store.getters.userPermissions, () => {
        rules = store.getters.userPermissions;
    })
}