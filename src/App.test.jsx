import React from 'react';
import { renderWithRouterRedux, userEvent, screen, createMemoryHistory } from '@/test-utils';
import App from './App';
import BasicLayout from './layouts/BasicLayout';
import renderRoutes from './config/renderRoutes';
import Exception404 from './pages/Exception/404';

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
        // debug();
        expect(footerElement).toBeInTheDocument();
    });

    test('full app navigating', () => {
        // const history = createMemoryHistory({ initialEntries: ['/home', '/todos', '/counter'] });
        const to = '/todos';
        const routes = [
            {
                path: '/',
                exact: true,
                component: () => <div>HomePage</div>
            },
            {
                name: 'About',
                path: '/about',
                component: () => <div>AboutPage</div>
            },
            {
                name: 'Todos',
                path: '/todos',
                component: () => (
                    <div>
                        <h1>TodosPage</h1>
                        <p>you are on the todos page</p>
                    </div>
                )
            },
            {
                name: 'Counter',
                path: '/counter',
                component: () => <div>CounterPage</div>
            },
            {
                name: 'Monitor',
                path: '/monitor',
                component: () => <div>MonitorPage</div>
            },
            {
                name: 'Some-Route',
                path: '/some-route',
                component: () => <div>Some Route</div>
            },
            {
                name: 'Profile',
                path: '/profile/:name',
                component: () => (
                    <div>
                        <h1>ProfilePage</h1>
                    </div>
                )
            },
            {
                component: Exception404
            }
        ];
        const route = ['/monitor', '/about', '/', '/counter'];
        const history = createMemoryHistory({ initialEntries: route });
        const location = { pathname: '/profile', hash: 'ffe15' };
        const match = {
            params: { username: 'jane' },
            url: '/profile/jane'
        };

        const { getByText, container } = renderWithRouterRedux(
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
                    <div data-testid="routes-wrapper">{renderRoutes(routes, { location, history, match })}</div>
                </BasicLayout>
            </App>,
            {
                route: to,
                history
            }
        );

        const routesWrapper = screen.getByTestId('routes-wrapper');
        expect(routesWrapper).toHaveTextContent(/^MonitorPage$/i);

        const linkElement = container.querySelector('a[href="/todos"]');
        const leftClick = { button: 0 };
        // screen.debug(linkElement);
        userEvent.click(linkElement, leftClick);
        expect(history.location.pathname).toEqual('/todos');

        // check that the content changed to the new page
        expect(getByText(/you are on the todos page/i)).toBeInTheDocument();
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
