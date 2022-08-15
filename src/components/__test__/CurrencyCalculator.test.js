import React from "react";
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, waitFor } from '@testing-library/react';
// component
import CurrencyCalculator from '../CurrencyCalculator';
// json
import validJson from '../../../__mocks__/validNbp.json'

beforeEach(()=>{
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.resolve({
        json: () => Promise.resolve(validJson)
    }));
});

test('renders compoennt', async () => {
const { getByText } = render(<CurrencyCalculator />);
expect(getByText('Please specify value')).toBeInTheDocument();
});

// currency can change everyday so to have correct test it's better to create mock with data from api

// test('calculates result after user types value', async () => {
// const { getByLabelText, getByText } = render(<CurrencyCalculator />);
// const input = getByLabelText('pln-input');
// fireEvent.change(input, { target: {value: '122' } });
// const textNode = await waitFor(() => getByText('122,00 zł = 26,05 €'));
// expect(textNode).toBeInTheDocument();
// });

test('calculates result after user types value', async () => {
    const { getByLabelText, getByText } = render(<CurrencyCalculator />);
    const input = getByLabelText('pln-input');

    /* fire events that update state */
    fireEvent.change(input, { target: {value: '122' } });

const textNode = await waitFor(() => getByText('122,00 zł = 26,05 €'));

expect(textNode).toBeInTheDocument();
});

test('renders error when json is invalid', async ()=> {
    jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.resolve({
        json: () => Promise.resolve({error: 'Something whent wrong...'})
    }));
    const { getByText } = render(<CurrencyCalculator />);
    const textNode = await waitFor(() => getByText('Cannot connect to NBP...'));
    expect(textNode).toBeInTheDocument();
})
