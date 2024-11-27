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
    locale: {
        rtl: true,
        locale: 'fa',
        fallback: 'fa-IR'
    },
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


/**
 * Set the mode to dark/light for the Vuetify class object.
 *
 * @param {Boolean} dark new value
 */
export async function setVuetifyThemeDark(dark) {
    console.log(`[Vuetify] Change theme to "${dark ? 'dark' : 'light'}"`);
    vuetify.theme.dark = dark;
}


export default vuetify;
