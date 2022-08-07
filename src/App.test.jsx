import React from 'react';
import { renderWithRouterRedux, userEvent, createMemoryHistory } from '@/test-utils';
import App from './App';
import BasicLayout from './layouts/BasicLayout';
import renderRoutes from './config/renderRoutes';

describe('App test rendering', () => {
    test('full app rendering', () => {
        const { getByText } = renderWithRouterRedux(
            <App>
                <BasicLayout collapsed fixedHeader location={{ pathname: '/home', hash: '' }} route={{ routes: [] }}>
                    <div>Card title</div>
                </BasicLayout>
            </App>
        );
        const footerElement = getByText(/CopyRight 2020/i);
        expect(footerElement).toBeInTheDocument();
    });

    test('full app navigating', () => {
        const history = createMemoryHistory({ initialEntries: ['/home', '/todos', '/counter'] });
        const { getByText } = renderWithRouterRedux(
            <App>
                <BasicLayout collapsed fixedHeader location={{ pathname: '/profile', hash: '' }} route={{ routes: [] }}>
                    <div>Card title</div>
                </BasicLayout>
            </App>,
            {
                route: '/todos',
                history
            }
        );
        const linkElement = getByText(/^todos$/i);

        const leftClick = { button: 0 };
        // screen.debug(linkElement);
        userEvent.click(linkElement, leftClick);
        expect(history.location.pathname).toEqual('/todos');

        // check that the content changed to the new page
        // expect(getByText(/you are on the counter page/i)).toBeInTheDocument();
    });

    test('landing on a non-exist page', () => {
        const routes = [
            {
                path: '/',
                exact: true,
                component: () => <div>HomePage</div>
            },
            {
                name: 'Some-Route',
                path: '/some-route',
                component: () => <div>Some Route</div>
            },
            {
                name: 'About',
                path: '/about',
                component: () => <div>AboutPage</div>
            },
            {
                component: () => <div>No Match for</div>
            }
        ];
        const route = ['/about', '/', '/counter'];
        const history = createMemoryHistory({ initialEntries: route });
        const location = { pathname: '/about', hash: '83f82' };
        const match = {
            params: { username: 'leo' },
            url: '/profile/leo'
        };

        const { getByText } = renderWithRouterRedux(
            <App>
                <BasicLayout
                    collapsed
                    fixedHeader
                    history={history}
                    location={location}
                    route={{
                        routes
                    }}
                >
                    {renderRoutes(routes, { location, history, match })}
                </BasicLayout>
            </App>,
            {
                history
            }
        );

        expect(getByText(/aboutPage/i)).toBeInTheDocument();

        history.push('/some/bad/route');
        expect(getByText(/No match for/i)).toBeInTheDocument();
    });
});
