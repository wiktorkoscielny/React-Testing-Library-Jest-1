import React from "react";
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, waitFor } from '@testing-library/react';
// component
import CurrencyCalculator from '../CurrencyCalculator';
test('renders compoennt', async () => {
const { getByText } = render(<CurrencyCalculator />);
expect(getByText('Please specify value')).toBeInTheDocument();
});
test('calculates result after user types value', async () => {
const { getByLabelText, getByText } = render(<CurrencyCalculator />);
const input = getByLabelText('pln-input');

fireEvent.change(input, { target: {value: '122' } });
const textNode = await waitFor(() => getByText('122,00 zł = 26,05 €'));
expect(textNode).toBeInTheDocument();
});