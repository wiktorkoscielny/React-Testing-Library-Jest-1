import React, { useState, useEffect }  from "react";

export default Calculator = () => {
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

    return(
        <div className="calculator">
            <div className="inputBox">
                
            </div>
            <div className="inputBox">

            </div>

            <label></label>
            <select>
                {/* MAP CURRENCY DATA */}
            </select>
            {/* OUTPUT */}
        </div>
    );
};