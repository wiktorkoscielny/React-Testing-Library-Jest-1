import React, { useState, useEffect }  from "react";

const formatCurrency = (value, currency) =>
  parseFloat(value).toLocaleString(undefined, {
    style: "currency",
    currency
  });

const Calculator = () => {
    const [error, setError] = useState(null);
    const [value, setValue] = useState("");
    const [result, setResult] = useState();
    const [currency, setCurrency] = useState("EUR");
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://api.nbp.pl/api/exchangerates/tables/A?format=json";
            const response = await fetch(url);
            const json = await response.json();
            setCurrencies(json[0].rates);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (value && currencies && currency) {
            const selectedCurrency = currencies.filter(c => c.code === currency)[0];
            if (!selectedCurrency || !selectedCurrency.mid) {
                setError('Cannot connect to NBP...');
                return;
            }
            const calculated = parseFloat(value) / selectedCurrency.mid;
            if (calculated > 0) {
                setError(null);
                setResult(parseFloat(value) / selectedCurrency.mid);
            } else {
                setError("Wrong value...");
            }
        } else if (!value) {
            setError("Please specify value");
          } else {
            setError("Something went wrong...");
          }
    }, [value, currencies, currency]);

    return(
        <div className="calculator">
            <div className="inputBox">
                <label>PLN:</label>
                <input
                    aria-label="pln-input"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
             </div>
            <div className="inputBox">
                <label>To:</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)}>
                    {currencies.map(c => (
                        <option key={c.code} value={c.code}>
                            {c.code} - {c.currency}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p>{error}</p>}
            {result && !error && (
                <p style={{ fontSize: "1.5em" }}>
                    {formatCurrency(value, "PLN")} = {formatCurrency(result, currency)}
                </p>
            )}
        </div>
    );
};
export default Calculator;