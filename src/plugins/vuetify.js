import {createVuetify} from 'vuetify';
import 'vuetify/styles'
import myCustomTheme from './vuetifyThemes';
// import {settings} from '@/config';/**/
import '@mdi/font/css/materialdesignicons.css'
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'
import faIR from 'date-fns/locale/fa-IR'

const vuetify = createVuetify({
    date: {
        adapter: DateFnsAdapter,
        locale: {
            fa: faIR,
            en: enUS,
        }
    },
    locale: 'faIR',
    fallback: 'fa',
    messages: {faIR},
    theme: {
        themes: {
            myCustomTheme
        },
        defaultTheme: 'myCustomTheme',
        options: {
            customProperties: true,
        },
    },
})

export async function setVuetifyThemeDark(dark) {
    vuetify.theme.dark = dark;
}


export default vuetify;
