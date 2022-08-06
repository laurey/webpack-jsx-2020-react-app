import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../test-utils';
import { BasicLayoutProvider } from '../contexts/useBasicLayoutContext';
import BasicLayout from './BasicLayout';

test('renders Basiclayout', () => {
    render(
        <Router>
            <BasicLayoutProvider>
                <BasicLayout />
            </BasicLayoutProvider>
        </Router>
    );
    const linkElement = screen.getByText(/Card title/i);
    expect(linkElement).toBeInTheDocument();
});
