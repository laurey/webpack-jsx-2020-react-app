import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, renderWithRouter, screen } from '@/test-utils';
import Posts from './Posts';

describe('Posts Component', () => {
    describe('react-dom render', () => {
        let fakePosts = [
            { id: 1, body: 'no-1', title: 't-1' },
            { id: 3, body: 'no-3', title: '' },
            { id: 5, body: 'no-5', title: 'title-5' }
        ];

        let container = null;
        beforeEach(() => {
            // setup a DOM element as a render target
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            // cleanup on exiting
            unmountComponentAtNode(container);
            container.remove();
            container = null;
            // restore the spy created with spyOn
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });

        test('full app rendering after request data', async () => {
            let instance = {};
            const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(fakePosts)
                })
            );

            // Use the asynchronous version of act to apply resolved promises
            await act(async () => {
                instance = render(<Posts />, container);
            });
            const { state } = instance;

            expect(spy).toHaveBeenCalledTimes(1);
            expect(state.pagination.total).toEqual(101);
            expect(state.dataSource[1]).toEqual(
                expect.objectContaining({
                    key: expect.any(Number)
                })
            );
            expect(state.dataSource[1]).toEqual(expect.objectContaining({ id: 3, key: 3 }));
        });
    });

    describe('react testing library render', () => {
        let fakePosts = [
            { id: 1, body: 'no-1', title: 't-1' },
            { id: 3, body: 'no-3', title: '' },
            { id: 5, body: 'no-5', title: 'title-5' }
        ];

        afterEach(() => {
            // cleanup on exiting
            // restore the spy created with spyOn
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });

        test('full app rendering after request data', async () => {
            // const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            //     Promise.resolve({
            //         json: () => Promise.resolve(fakePosts)
            //     })
            // );

            const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
                json: jest.fn().mockResolvedValue(fakePosts)
            });

            // Use the asynchronous version of act to apply resolved promises
            act(() => {
                renderWithRouter(<Posts />);
            });

            expect(spy).toHaveBeenCalledTimes(1);
            // expect(spy).toHaveReturnedWith(fakePosts);
            // expect(screen.getByText(/No match for/i)).toBeInTheDocument();
        });
    });
});
