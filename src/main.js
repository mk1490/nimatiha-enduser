import {createApp} from 'vue'
import App from './App.vue'


import {registerPlugins, registerComponents} from "@/plugins";

const app = createApp(App)
registerPlugins(app);
registerComponents(app);

app.mount('#app')