import FancyLink from '../components/FancyLink';

const routes = [
    {
        name: 'Home',
        component: FancyLink,
        hideInMenu: true,
        hideInSider: false,
        path: '/'
    },
    {
        name: 'Topics',
        component: FancyLink,
        hideInMenu: true,
        hideInSider: false,
        path: '/topics'
    },
    {
        name: 'Counter',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/counter'
    },
    {
        name: 'MyHome',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/home'
    },
    {
        name: 'Todos',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/todos'
    },
    {
        name: 'Posts',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/posts'
    },
    {
        name: 'Contact',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/contact'
    },
    {
        name: 'Users',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/users'
    },
    {
        name: 'Blogs',
        component: FancyLink,
        hideInMenu: true,
        hideInSider: false,
        path: '/blogs'
    },
    {
        name: 'About',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/about'
    },
    {
        name: 'Demo',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/demo'
    },
    {
        name: 'Employees',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: '/employees'
    },
    {
        name: 'Sign Up',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/signup'
    },
    {
        name: 'Albums',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/albums'
    },
    {
        name: 'Sign In',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/signin'
    },
    {
        name: 'Dashboard',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/dashboard'
    },
    {
        name: 'LazyDash',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/lazyDash'
    },
    {
        name: 'RateControl',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: true,
        path: '/rateControl'
    },
    {
        name: 'Comments',
        component: FancyLink,
        hideInMenu: false,
        hideInSider: false,
        path: {
            pathname: '/comments'
            // search: '?_sort=id&_order=desc&filter=title_like,qu'
            // hash: '#the-hash',
            // state: { fromDashboard: true },
        }
    }
];

export default routes;
