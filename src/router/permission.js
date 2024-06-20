import router from './index'
import Vue from 'vue';
import vuex from '../store/index'
import NProgress from 'nprogress';


let whiteList = ['Home', 'login', 'registration'];

async function isAuth() {
    await vuex.dispatch('checkIsAuth')
    return vuex.getters.isLogin;
}

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
})
router.beforeEach(async (toRoute, from, next) => {
    await vuex.dispatch('showLoading')
    await isAuth()
    next();
});
router.afterEach((to, from) => {
    Vue.prototype.hideLoader()
    NProgress.done();
})