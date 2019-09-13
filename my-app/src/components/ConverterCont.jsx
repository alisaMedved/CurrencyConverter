import React, {useEffect, useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getAllRates, getSelectedRates} from "../api/api";
import TextField from '@material-ui/core/TextField';

const ConverterContainer = () => {
    const [currencyFrom, setCurrencyFrom] = useState({
        selectedCurrencyFrom: ''
    });

    const [ratesFrom, setRatesFrom] = useState([]);

    const [currencyTo, setCurrencyTo] = useState({
        selectedCurrencyTo: ''
    });

    const [ratesTo, setRatesTo] = useState([]);

    const [convertCoefficient, setConvertCoefficient] = useState(1);
    const [valueFrom, setValueFrom] = useState({
        inputValueFrom: 1
    });
    const [valueTo, setValueTo] = useState("");

    const state = {currencyTo,
        currencyFrom, ratesTo, ratesFrom, convertCoefficient, valueFrom, valueTo};

    function changeCurrencyFrom(event) {
        setCurrencyFrom(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
    function changeCurrencyTo(event) {
        setCurrencyTo(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }
    const changeValueFrom = name => event => {
        setValueFrom({...valueFrom, [name]: parseInt(event.target.value, 10)});
    };

    useEffect(
        () => {
            getAllRates()
                .then(data => {
                    const mas = Object.keys(data.rates);
                    mas.unshift(data.base);
                    setRatesFrom(mas);
                    setRatesTo(mas);
                });
        }, []);

    const getConvertionResult = (e) => {
        getSelectedRates(state.currencyFrom.selectedCurrencyFrom, state.currencyTo.selectedCurrencyTo)
            .then(data => {
                debugger;
                setConvertCoefficient(data.rates[state.currencyTo.selectedCurrencyTo]);
                console.log(data.rates[state.currencyTo.selectedCurrencyTo]);
            });
        e.preventDefault();
    };

    useEffect(() => {
        const result = valueFrom.inputValueFrom * convertCoefficient;
        setValueTo((Math.round(result * 100) / 100).toString(10));
    }, [state.convertCoefficient]);

    window.state = state;
    return (
        <div>
            <form onSubmit={(e) => getConvertionResult(e)}>
                <div>
                    <FormControl>
                        <FormHelperText>from</FormHelperText>
                        <Select
                            value={currencyFrom.selectedCurrencyFrom}
                            onChange={changeCurrencyFrom}
                            name="selectedCurrencyFrom"
                        >
                            {state.ratesFrom
                                .map(
                                    (r, i) => {
                                        return (<MenuItem key={i} value={r}>{r}</MenuItem>);
                                    }
                                )}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormHelperText>to</FormHelperText>
                        <Select
                            value={currencyTo.selectedCurrencyTo}
                            onChange={changeCurrencyTo}
                            name="selectedCurrencyTo"
                        >
                            {state.ratesTo
                                .map(
                                    (r, i) => {
                                        return (<MenuItem key={i} value={r}>{r}</MenuItem>);
                                    }
                                )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="from"
                        value={valueFrom.inputValueFrom}
                        onChange={changeValueFrom('inputValueFrom')}
                        type="number"
                    />
                    <TextField
                        label="to"
                        value={state.valueTo}
                        type="text"
                    />
                </div>
                <button type="submit">Конвертировать!</button>
            </form>
        </div>
    );
};

export default ConverterContainer;


