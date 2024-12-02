import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from '../view/layout/TheLayout.vue';

export const constantRoutes = [
    {
        path: '/pathMatch(.*)', hidden: true,
    },
    {
        path: '/',
        name: 'root',
        redirect: '/profile',
    },
    {
        path: '/profile',
        name: 'profile', // redirect: '/registration',
        component: Layout,
        meta: {
            noCache: true, affix: true
        },
        children: [
            {
                name: 'test',
                path: '/profile/test',
                component: () => import('@/view/components/TestList/TestList.vue'),
            },
            {
                name: 'test-details',
                path: '/test-details/:id',
                component: () => import('@/view/components/Test/Test.vue'),
            },
        ]
    },

    {
        name: 'registration',
        path: '/questionnaire/:slug?',
        component: () => import('@/view/components/Registration/RegistrationPage.vue'),
    },
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@/view/components/Registration/RegistrationPage.vue'),
    },

]
export default createRouter({
    scrollBehavior: () => ({y: 0}), routes: constantRoutes, history: createWebHashHistory(process.env.BASE_URL),

});
export const asyncRoutes = [{path: '*', redirect: '/error/404', hidden: true},];
