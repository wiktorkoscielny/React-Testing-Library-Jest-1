import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './styles.css';

// components
import Calculator from "./components/CurrencyCalculator";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='App'>
    <h1>PLN exchange</h1>
    <Calculator />
  </div>
);

