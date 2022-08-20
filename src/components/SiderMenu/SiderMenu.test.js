import { getFlatMenuKeys } from '@/utils/utils';

const menu = [
    {
        path: '/dashboard',
        children: [
            {
                path: '/dashboard/setting'
            },
            {
                path: '/dashboard/center'
            }
        ]
    },
    {
        path: '/employee',
        children: [
            {
                path: '/employee/:id',
                children: [
                    {
                        path: '/employee/:id/setting'
                    }
                ]
            }
        ]
    }
];

const flatMenuKeys = getFlatMenuKeys(menu);

describe('test convert nested menu to flat menu', () => {
    it('simple menus', () => {
        expect(flatMenuKeys).toEqual([
            '/dashboard',
            '/dashboard/setting',
            '/dashboard/center',
            '/employee',
            '/employee/:id',
            '/employee/:id/setting'
        ]);
    });
});
