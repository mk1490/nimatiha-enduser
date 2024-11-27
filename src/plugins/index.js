import vuetify from './vuetify'
import router from '@/router'
import store from '@/store'
import httpRequest from '@/plugins/httpRequest'
import commonComponents from "@/plugins/commonComponents";
import BaseModal from "@/view/widget/Base/BaseModal.vue";
import BaseCardLayout from "@/view/widget/Base/BaseCardLayout.vue";
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";
import BaseTable from "@/view/widget/Base/BaseTable.vue";
import BaseSqaureButton from "@/view/widget/Base/BaseSqaureButton.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseComboBox from "@/view/widget/Base/BaseComboBox.vue";
import commonMethods from "@/plugins/commonMethods";
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import VueSweetalert2 from "vue-sweetalert2";
import eventBus from "@/plugins/event-bus";
import i18n from "@/locale";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css'

export function registerPlugins(app) {
    app
        .use(vuetify)
        .use(router)
        .use(store)
        .use(httpRequest)
        .use(eventBus)
        .use(i18n)
        .use(commonComponents)
        .use(VueSweetalert2)
        .use(ToastPlugin)
        .use(commonMethods);
}

export function registerComponents(app) {
    app.component('base-modal', BaseModal);
    app.component('base-card-layout', BaseCardLayout);
    app.component('base-text-field', BaseTextField);
    app.component('base-text-area', BaseTextArea);
    app.component('base-table', BaseTable);
    app.component('base-square-button', BaseSqaureButton);
    app.component('base-card-layout', BaseCardLayout);
    app.component('base-card-layout', BaseCardLayout);
    app.component('base-select', BaseSelect);
    app.component('base-combo-box', BaseComboBox);
    app.component('DatePicker', Vue3PersianDatetimePicker)
}


