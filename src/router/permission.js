import router from '@/router/index'
import Vue from 'vue';
import vuex from '../store/index'
import NProgress from 'nprogress';


let whiteList = ['Home', 'login', 'registration'];

async function isAuth() {
    await vuex.dispatch('checkIsAuth')
    return vuex.getters.isLogin;
}

async function isCompleteProfile() {
    return vuex.getters.profileData && !!vuex.getters.profileData.status;
}

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
})
router.beforeEach(async (toRoute, from, next) => {
    await vuex.dispatch('showLoading')
    const auth = await isAuth()
    // {
    //     query:{
    //         redirectTo: toRoute.
    //     }
    // }
    next();
});
router.afterEach((to, from) => {
    NProgress.done();
})
