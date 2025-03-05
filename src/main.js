import {createApp} from 'vue'
import App from './App.vue'
import 'video.js/dist/video-js.css'


import {registerPlugins, registerComponents} from "@/plugins";

const app = createApp(App)
registerPlugins(app);
registerComponents(app);

app.mount('#app')