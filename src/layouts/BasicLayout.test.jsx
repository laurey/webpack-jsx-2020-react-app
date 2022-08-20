import React from 'react';
import { Route, Switch } from 'react-router';
import { renderWithRouterRedux, userEvent, createMemoryHistory } from '@/test-utils';
import { BasicLayoutProvider } from '../contexts/useBasicLayoutContext';
import BasicLayout from './BasicLayout';
import renderRoutes from '@/config/renderRoutes';
import Authorized from '@/pages/Authorized';
import Exception404 from '@/pages/404';

describe('BasicLayout test rendering', () => {
    test('full BasicLayout component rendering', () => {
        const { getByText } = renderWithRouterRedux(
            <BasicLayoutProvider>
                <BasicLayout collapsed fixedHeader location={{ pathname: '/home', hash: '' }} route={{ routes: [] }}>
                    <div>Card title</div>
                </BasicLayout>
            </BasicLayoutProvider>,
            {
                history: createMemoryHistory({ initialEntries: ['/', '/topics', '/counter'] })
            }
        );
        const linkElement = getByText(/Card title/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('render BasicLayout with basic route', () => {
        const route = '/some-bad-route';
        const history = createMemoryHistory({ initialEntries: ['/some-route', '/', '/topics', '/counter'] });
        const location = { pathname: '/topics', hash: '' };

        const { getByText } = renderWithRouterRedux(
            <BasicLayoutProvider>
                <BasicLayout collapsed fixedHeader history={history} location={location} route={{ routes: [] }}>
                    <Switch>
                        <Route exact path="/">
                            <div>HomePage</div>
                        </Route>
                        <Route path="/some-route">
                            <div>Some Route</div>
                        </Route>
                        <Route path="/topics">
                            <div>Topics Route</div>
                        </Route>
                        <Route>
                            <div>No Match Route</div>
                        </Route>
                    </Switch>
                </BasicLayout>
            </BasicLayoutProvider>,
            {
                // route,
                history
            }
        );

        const text = getByText(/Some Route/i);
        expect(text).toBeInTheDocument();

        history.push(route);
        expect(getByText(/No Match/i)).toBeInTheDocument();
    });

    test('render BasicLayout with authority route', () => {
        const path = '/profile';
        const badPath = '/some-bad-route';
        const authority = ['admin', 'user'];
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
                path: '/profile',
                component: () => (
                    <div>
                        <h1>ProfilePage</h1>
                        <div>need authority:</div>
                        <p>{authority.join()}</p>
                    </div>
                ),
                Routes: [Authorized],
                authority
            },
            {
                component: Exception404
            }
        ];
        const route = ['/monitor', '/about', '/', '/counter'];
        const history = createMemoryHistory({ initialEntries: route });
        const location = { pathname: '/', hash: '8fe12' };
        const match = {
            params: { username: 'leo' },
            url: '/profile/leo'
        };

        const { getByText } = renderWithRouterRedux(
            <BasicLayoutProvider>
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
            </BasicLayoutProvider>,
            {
                route: '/topics',
                history
            }
        );

        const text = getByText(/MonitorPage/i);
        expect(text).toBeInTheDocument();

        history.push(badPath);
        expect(getByText(/Type: 404/i)).toBeInTheDocument();

        history.push(path);
        expect(getByText(/Exception403/i)).toBeInTheDocument();
    });
});
