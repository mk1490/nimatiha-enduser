import Layout from '../../layouts/default.vue';

export const routes = [
    {
        path: '/pathMatch(.*)', hidden: true,
    },
    {
        path: '/',
        name: 'root',
        redirect: '/profile',
    },

    {
        name: 'survey',
        path: '/survey',
        component: Layout,

        children: [
            {
                path: ':slug',
                component: () => import('@/pages/Questionnaire/Questionnaire.vue'),
            }
        ]
    },
    {
        path: '/profile',
        name: 'profile', // redirect: '/registration',
        component: Layout,
        meta: {
            noCache: true, affix: true
        },
        children: [
            // {
            //     name: 'profile-test',
            //     path: '/profile/test',
            //     component: () => import('@/pages/Test/TestList.vue'),
            // },
            {
                name: 'test',
                path: '/test/:slug',
                component: () => import('@/pages/Test/Test.vue'),
            },
            // {
            //     name: 'test-details',
            //     path: '/test-details/:id',
            //     component: () => import('@/pages/Test/Test.vue'),
            // },
            // {
            //     name: 'questionnaires',
            //     path: 'questionnaires',
            //     component: () => import('@/pages/Questionnaire/QuestionnaireList'),
            // },
            // {
            //     name: 'questionnaire-details',
            //     path: 'questionnaire-details/:slug?',
            //     component: () => import('@/pages/Questionnaire/Questionnaire'),
            // },
            {
                name: 'courses',
                path: '/course',
                redirect: '/course/list',
                children: [
                    {
                        name: 'courseList',
                        path: 'list',
                        component: () => import('@/pages/Courses/Courses.vue'),
                    },
                    {
                        name: 'courseDetails',
                        path: ':id',
                        component: () => import('@/pages/Courses/CourseDetails.vue'),
                    },
                ]
            },

            //
            // {
            //     name: 'complete-profile',
            //     path: 'complete',
            //     component: () => import('@/pages/ProfileComplete.vue'),
            // },

        ]
    },
    //
    // {
    //     name: 'registration',
    //     path: '/questionnaire/:slug?',
    //     component: () => import('@/pages/Registration/RegistrationPage.vue'),
    // },
    {
        name: 'login',
        path: '/login',
        component: () => import('@pages/Registration/RegistrationPage.vue'),
    },
]
