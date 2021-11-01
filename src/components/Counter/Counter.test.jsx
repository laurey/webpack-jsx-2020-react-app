import React from 'react';
import { renderWithRouterRedux, userEvent } from '@/test-utils';
import Counter from '.';

test('Counter changes the value after click', () => {
    const { getByText } = renderWithRouterRedux(<Counter value={12} />, { initialState: { counter: { value: 9 } } });
    expect(getByText(/Store-Counter-value: 9/i)).toBeInTheDocument();

    const btnElement = getByText(/store-inc-state/i);
    expect(btnElement).toBeInTheDocument();

    userEvent.click(btnElement);
    expect(getByText(/Store-Counter-value: 10/i)).toBeInTheDocument();
});
