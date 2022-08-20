import loadable from '@loadable/component';
import Loading from '../components/Loading';

export const routes = [
    {
        name: 'demos',
        label: 'DemoLay',
        path: '/demo',
        icon: 'apple',
        component: loadable(() => import('../layouts/DemoLayout')),
        Routes: [loadable(() => import('../pages/Authorized'))],
        authority: ['user']
    },
    { parent: 'demos', path: '/demo', redirect: '/demo/workplace' },
    {
        parent: 'demos',
        name: 'demoWorkplace',
        label: 'DemoWorkplace',
        icon: 'chrome',
        path: '/demo/workplace',
        component: loadable(() => import('../pages/Demo/Workplace'))
    },
    {
        parent: 'demos',
        label: 'DemoView',
        name: 'demoView',
        icon: 'slack',
        path: '/demo/viewlist',
        component: loadable(() => import('../pages/Demo/ViewList'))
    },
    {
        path: '/',
        name: 'home',
        label: 'Home',
        component: loadable(() => import('../layouts/BasicLayout'))
    },
    { path: '/', exact: true, redirect: '/home', parent: 'home' },
    {
        parent: 'home',
        label: 'iHome',
        name: 'ihome',
        icon: 'bank',
        path: '/home',
        component: loadable(() => import('../pages/Home'))
    },
    {
        parent: 'home',
        label: 'LogOut',
        name: 'logOut',
        icon: 'logout',
        path: '/logout',
        component: loadable(() => import('../pages/LogOut'))
    },
    {
        parent: 'home',
        name: 'dashboard',
        label: 'Dashboard',
        icon: 'google',
        path: '/dashboard',
        component: loadable(() => import('../pages/Dashboard'), { fallback: Loading })
    },
    {
        parent: 'dashboard',
        path: '/dashboard/analysis',
        name: 'analysis',
        label: 'Analysis',
        icon: 'chrome',
        component: loadable(() => import('../pages/Dashboard/Analysis'))
    },
    {
        parent: 'dashboard',
        path: '/dashboard/center',
        name: 'center',
        label: 'Center',
        icon: 'setting',
        hideInMenu: true,
        component: loadable(() => import('../pages/Dashboard/Center'))
    },
    {
        parent: 'home',
        label: 'About',
        name: 'about',
        icon: 'crown',
        path: '/about',
        component: loadable(() => import('../pages/About'))
    },
    {
        parent: 'home',
        label: 'Monitor',
        name: 'monitor',
        icon: 'twitter',
        path: '/monitor',
        Routes: [loadable(() => import('../pages/Authorized'))],
        authority: ['admin', 'sysAdmin'],
        hideChildrenInMenu: true
    },
    { parent: 'monitor', path: '/monitor', redirect: '/monitor/aa' },
    {
        parent: 'monitor',
        path: '/monitor/aa',
        name: 'ma',
        label: 'MA',
        icon: 'youtube',
        component: loadable(() => import('../pages/Monitor/AA'))
    },
    {
        parent: 'monitor',
        path: '/monitor/bb',
        name: 'mb',
        label: 'MB',
        component: loadable(() => import('../pages/Monitor/BB'))
    },
    {
        parent: 'home',
        name: 'signin',
        label: 'SignIn',
        icon: 'login',
        path: '/signin',
        component: loadable(() => import('../pages/SignIn'))
    },
    {
        parent: 'home',
        component: loadable(() => import('../pages/Exception/404'))
    }
];

export default routes;
