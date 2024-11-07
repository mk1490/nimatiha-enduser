import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from '../view/layout/TheLayout.vue';

export const constantRoutes = [{
    path: '/pathMatch(.*)', hidden: true,
}, {
    path: '/', name: 'Root', // redirect: '/registration',
    component: Layout, meta: {
        noCache: true, affix: true, title: 'route.Management',
    }, children: [{
        path: '', redirect: '/registration', name: 'Home', component: () => import('@/view/components/Home/Home.vue'),
    }]
}, {
    path: '/:slug?',
    name: 'registration',
    component: () => import('@/view/components/Registration/RegistrationPage.vue'),
}, {
    path: '/login', name: 'login', component: () => import('@/view/components/Auth/Login.vue'),
}, {
    path: '/profile',
    name: 'profile',
    redirect: '/profile/dashboard',
    component: () => import('@/view/components/Profile/TheLayoutProfile.vue'),
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/view/components/Profile/Dashboard/Dashboard.vue'),
    }, {
        path: '/uploadDocuments',
        name: 'uploadDocuments',
        component: () => import('@/view/components/Profile/UploadDocuments/UploadDocuments.vue'),
    }, {
        path: '/statusPage', name: 'statusPage', component: () => import('@/view/components/Profile/StatusPage.vue'),
    },]
}]
export default createRouter({
    scrollBehavior: () => ({y: 0}), routes: constantRoutes, history: createWebHashHistory(process.env.BASE_URL),

});
export const asyncRoutes = [{path: '*', redirect: '/error/404', hidden: true},];
