import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from '../view/layout/TheLayout.vue';

export const constantRoutes = [
    {
        path: '/pathMatch(.*)', hidden: true,
    },
    {
        path: '/',
        name: 'Root', // redirect: '/registration',
        component: Layout,
        meta: {
            noCache: true, affix: true, title: 'route.Management',
        },
        children: [
            {
                path: '', redirect: '/registration', name: 'Home'
            }
        ]
    },
    {
        name: 'test',
        path: '/test/:slug',
        component: () => import('@/view/components/Test/Test.vue'),
    },
    {
        name: 'registration',
        path: '/questionnaire/:slug?',
        component: () => import('@/view/components/Registration/RegistrationPage.vue'),
    },

]
export default createRouter({
    scrollBehavior: () => ({y: 0}), routes: constantRoutes, history: createWebHashHistory(process.env.BASE_URL),

});
export const asyncRoutes = [{path: '*', redirect: '/error/404', hidden: true},];
