/**
 * vva v0.0.5
 * (c) 2019 NelsonEAX
 * @license MIT
 */

import {createI18n} from 'vue-i18n';

import vuetify from '@/locale/vuetify';
import en from './en_US';
import fa from './fa_IR';


const messages = {
    en: {
        ...en,
        // $vuetify: vuetify.en,
    },
    fa: {
        ...fa,
        // $vuetify: vuetify.fa,
    },
};

/**
 * Available locales
 */
export const locales = [
    {
        title: 'English',
        locale: 'en',
        abbr: 'ENG',
    },
    {
        title: 'فارسی',
        locale: 'fa',
        abbr: 'IRR',
    },
];

const i18n = createI18n({
    locale: 'fa',
    messages,
});

export async function setLocale(locale) {
    if (i18n.locale !== locale) {
        i18n.locale = locale;
    } else {

    }
}

export default i18n;
