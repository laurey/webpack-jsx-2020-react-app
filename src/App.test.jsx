import React from 'react';
import { renderWithRouterRedux, userEvent, createMemoryHistory } from '@/test-utils';
import App from './App';

describe('App test rendering', () => {
    test('full app rendering', () => {
        const { getByText } = renderWithRouterRedux(<App />);
        const footerElement = getByText(/Footer content/i);
        expect(footerElement).toBeInTheDocument();
    });

    test('full app navigating', () => {
        const { getByText, history } = renderWithRouterRedux(<App />, {
            history: createMemoryHistory({ initialEntries: ['/', '/topics', '/counter'] })
        });
        const linkElement = getByText(/^topics$/i);

        const leftClick = { button: 0 };
        // screen.debug(linkElement);
        userEvent.click(linkElement, leftClick);
        expect(history.location.pathname).toEqual('/topics');

        // check that the content changed to the new page
        // expect(getByText(/you are on the counter page/i)).toBeInTheDocument();
    });

    test('landing on a non-exist page', () => {
        const { getByText, history } = renderWithRouterRedux(<App />);
        history.push('/some/bad/route');

        expect(getByText(/No match for/i)).toBeInTheDocument();
    });
});
