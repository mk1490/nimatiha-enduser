import {useToast} from 'vue-toast-notification'
import PersianDate from 'persian-date'


const $toast = useToast()

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
