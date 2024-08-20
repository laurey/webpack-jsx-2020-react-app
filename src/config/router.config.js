import loadable from '@loadable/component';

const routes = [
    {
        path: '/demo',
        icon: 'apple',
        component: loadable(() => import('../layouts/DemoLayout')),
        // Routes: [loadable(() => import('../pages/Authorized'))],
        // authority: ['admin', 'user'],
        routes: [
            { path: '/demo', redirect: '/demo/workplace' },
            {
                name: 'DemoWorkplace',
                icon: 'chrome',
                path: '/demo/workplace',
                Routes: [loadable(() => import('../pages/Authorized'))],
                authority: ['admin', 'user'],
                component: loadable(() => import('../pages/Demo/Workplace'))
            },
            {
                name: 'DemoForm',
                icon: 'laptop',
                path: '/demo/form',
                Routes: [loadable(() => import('../pages/Authorized'))],
                authority: ['user'],
                component: loadable(() => import('../pages/Demo/CustomizedForm'))
            },
            {
                name: 'Dashboard',
                icon: 'key',
                path: '/demo/dashboard',
                component: loadable(() => import('../pages/Dashboard')),
                routes: [
                    { path: '/demo/dashboard', exact: true, redirect: '/demo/dashboard/center' },
                    {
                        path: '/demo/dashboard/analysis',
                        name: 'Analysis',
                        icon: 'table',
                        component: loadable(() => import('../pages/Dashboard/Analysis'))
                    },
                    {
                        path: '/demo/dashboard/center',
                        name: 'Center',
                        icon: 'wifi',
                        hideInMenu: true,
                        component: loadable(() => import('../pages/Dashboard/Center'))
                    },
                    {
                        path: '/demo/dashboard/setting',
                        name: 'Setting',
                        icon: 'team',
                        component: loadable(() => import('../pages/Dashboard/Setting'))
                    }
                ]
            },
            {
                name: 'DemoView',
                icon: 'slack',
                path: '/demo/viewlist',
                component: loadable(() => import('../pages/Demo/ViewList'))
            }
        ]
    },
    // path: /
    {
        path: '/',
        component: loadable(() => import('../layouts/BasicLayout')),
        routes: [
            { path: '/', exact: true, redirect: '/home' },
            {
                name: 'Home',
                icon: 'bank',
                path: '/home',
                component: loadable(() => import('../pages/Home'))
            },
            {
                name: 'LogOut',
                icon: 'logout',
                path: '/logout',
                component: loadable(() => import('../pages/LogOut'))
            },
            // path: /dashboard
            {
                name: 'Dashboard',
                icon: 'google',
                path: '/dashboard',
                component: loadable(() => import('../pages/Dashboard')),
                routes: [
                    { path: '/dashboard', exact: true, redirect: '/dashboard/center' },
                    {
                        path: '/dashboard/analysis',
                        name: 'Analysis',
                        icon: 'chrome',
                        component: loadable(() => import('../pages/Dashboard/Analysis'))
                    },
                    {
                        path: '/dashboard/center',
                        name: 'Center',
                        icon: 'setting',
                        hideInMenu: true,
                        component: loadable(() => import('../pages/Dashboard/Center'))
                    },
                    {
                        path: '/dashboard/setting',
                        name: 'Setting',
                        icon: 'github',
                        component: loadable(() => import('../pages/Dashboard/Setting'))
                    },
                    {
                        name: 'Comments',
                        icon: 'html5',
                        path: '/dashboard/comments',
                        component: loadable(() => import('../pages/Dashboard/Comments'))
                    }
                ]
            },
            {
                name: 'About',
                icon: 'crown',
                path: '/about',
                component: loadable(() => import('../pages/About'))
            },
            {
                name: 'Posts',
                // icon: 'crown',
                path: '/posts',
                component: loadable(() => import('../pages/Posts'))
            },
            {
                name: 'Comments',
                icon: 'html5',
                path: '/comments'
                // component: loadable(() => import('../pages/Comments'))
            },
            {
                name: 'Counter',
                icon: 'counter',
                path: '/counter',
                component: loadable(() => import('../pages/Counter'))
            },
            {
                name: 'Form',
                icon: 'form',
                path: '/form',
                // component: loadable(() => import('../pages/Dashboard')),
                routes: [
                    {
                        path: '/form/basic-form',
                        name: 'basicform',
                        hideInMenu: true,
                        component: loadable(() => import('../pages/Forms/BasicForm'))
                    },
                    {
                        path: '/form/login',
                        name: 'loginForm',
                        component: loadable(() => import('../pages/Forms/LoginForm'))
                    },
                    {
                        path: '/form/step-form',
                        name: 'stepform',
                        component: loadable(() => import('../pages/Forms/StepForm')),
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/form/step-form',
                                redirect: '/form/step-form/info'
                            },
                            {
                                path: '/form/step-form/info',
                                name: 'info',
                                // component: './Forms/StepForm/Info'
                                component: loadable(() => import('../pages/Forms/StepForm/Info'))
                            },
                            {
                                path: '/form/step-form/confirm',
                                name: 'confirm',
                                component: loadable(() => import('../pages/Forms/StepForm/Confirm'))
                            },
                            {
                                path: '/form/step-form/result',
                                name: 'result',
                                component: loadable(() => import('../pages/Forms/StepForm/Result'))
                            }
                        ]
                    }
                ]
            },
            // path: /monitor
            {
                name: 'Monitor',
                icon: 'twitter',
                path: '/monitor',
                Routes: [loadable(() => import('../pages/Authorized'))],
                authority: ['admin', 'sysAdmin'],
                hideChildrenInMenu: true,
                routes: [
                    { path: '/monitor', redirect: '/monitor/aa' },
                    {
                        path: '/monitor/aa',
                        name: 'ma',
                        icon: 'youtube',
                        component: loadable(() => import('../pages/Monitor/AA'))
                    },
                    {
                        path: '/monitor/bb',
                        name: 'mb',
                        component: loadable(() => import('../pages/Monitor/BB'))
                    }
                ]
            },
            {
                name: 'SignIn',
                icon: 'login',
                path: '/signin',
                component: loadable(() => import('../pages/SignIn'))
            },
            {
                component: loadable(() => import('../pages/Exception/404'))
            }
        ]
    }
];

export default routes;
