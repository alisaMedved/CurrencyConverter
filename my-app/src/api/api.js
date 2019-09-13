import * as axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.exchangeratesapi.io"
});

export const getAllRates = () => {
    return instance.get("/latest")
        .then(response => {return response.data;});
};

export const getSelectedRates = (currencyFrom, CurrencyTo) => {
    return instance.get(`/latest?base=${currencyFrom}&symbols=${CurrencyTo}`)
        .then(response => response.data);
};


