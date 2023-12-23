import React from 'react';
import { render, waitFor, fireEvent, screen } from '@/test-utils';
import App from './';

describe('App test rendering', () => {
    test('full app rendering', () => {
        const { getByText } = render(
            <App>
                <div>this is from children props</div>
            </App>
        );
        const target = getByText(/from children/i);
        expect(target).toBeInTheDocument();
    });

    test('should show empty when no url', () => {
        render(<App />);
        const target = screen.getByText(/no data/i);
        expect(target).toBeInTheDocument();
    });

    test('should trigger onLoad when with url', async () => {
        const handleLoad = jest.fn();
        const { container } = render(<App url="http://www.example.com" onLoad={handleLoad} />);

        const target = container.querySelector('.iframe');
        expect(target).toBeInTheDocument();
        expect(target).toHaveAttribute('src', 'http://www.example.com');

        fireEvent.load(target);

        await waitFor(() => {
            expect(handleLoad).toHaveBeenCalled();
            expect(handleLoad).toHaveBeenCalledTimes(1);
        });
    });
});
