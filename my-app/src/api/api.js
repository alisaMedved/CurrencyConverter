import * as axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.exchangeratesapi.io"
});

export const getAllRates = async () => {
    return instance.get("/latest")
        .then(response => response.data)
};
