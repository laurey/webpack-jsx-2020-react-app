import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: '监控页',
                path: 'monitor'
            },
            {
                name: '工作台',
                path: 'workplace'
            }
        ]
    },
    {
        name: 'Demo',
        icon: 'dashboard',
        path: 'demo'
    },
    {
        name: '表单页',
        icon: 'form',
        path: 'form',
        children: [
            {
                name: '基础表单',
                path: 'basic-form'
            },
            {
                name: '分步表单',
                path: 'step-form'
            }
        ]
    },
    {
        name: '列表页',
        icon: 'table',
        path: 'list',
        children: [
            {
                name: '标准列表',
                path: 'basic-list'
            },
            {
                name: '卡片列表',
                path: 'card-list'
            },
            {
                name: '搜索列表',
                path: 'search',
                children: [
                    {
                        name: '搜索列表（应用）',
                        path: 'applications'
                    }
                ]
            }
        ]
    },
    {
        name: '异常页',
        icon: 'warning',
        path: 'exception',
        children: [
            {
                name: '403',
                path: '403'
            },
            {
                name: '404',
                path: '404'
            },
            {
                name: '500',
                path: '500'
            }
        ]
    },
    {
        name: '账户',
        icon: 'user',
        path: 'user',
        authority: 'guest',
        children: [
            {
                name: '登录',
                path: 'signin'
            },
            {
                name: '注册',
                path: 'signup'
            },
            {
                name: '注册结果',
                path: 'signup-result'
            }
        ]
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }

        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
