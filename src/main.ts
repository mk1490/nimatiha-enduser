import {createApp} from 'vue'

import App from '@/App.vue'
import '@styles/styles.scss'
import '@styles/styles.scss'
import {registerPlugins} from '@/@core/utils/plugins'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'


import 'sweetalert2/dist/sweetalert2.min.css'
import VueSweetalert2 from 'vue-sweetalert2'

import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

const app = createApp(App)

registerPlugins(app)

app.use(VueSweetalert2)
app.use(ToastPlugin, {
    position: 'center',

})
app.mount('#app')
