import {createStore} from 'vuex';
import auth from './modules/auth';
import baseData from './modules/baseData';
import {App} from "vue";

export default function (app: App) {
    const store = createStore({
        modules: {
            auth,
            baseData
        },
        state: {},
        mutations: {},
        actions: {},
        getters: {},
    });

    app.use(store)
}
