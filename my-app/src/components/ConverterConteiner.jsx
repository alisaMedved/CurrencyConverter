import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getAllRates} from "../api/api";
import TextField from '@material-ui/core/TextField';

const ConverterConteiner = () => {

    const [valueTo, setValueTo] = React.useState("");
    const [convertCoefficient, setConvertCoefficient] = React.useState({
        coefficient: 1
    });

    const [valueFrom, setValueFrom] = React.useState({
        inputValueFrom: 1
    });
    const changeValueFrom = name => event => {
        setValueFrom({...valueFrom, [name]: parseInt(event.target.value, 10)});
    };


    const [currencyTo, setCurrencyTo] = React.useState({
        selectedCurrencyTo: ''
    });
    const [rates, setRates] = React.useState({
        objectRates: {}
    });

    const state = {currencyTo, rates, valueFrom, convertCoefficient, valueTo};

    React.useEffect(() => {
        getAllRates()
            .then(data => {
                setRates(data.rates);
            });
    }, []);

    function changeCurrencyTo(event) {
        setCurrencyTo(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        setConvertCoefficient(state.rates[event.target.value]);
    }

    const getConvertionResult = (e) => {
        debugger;
        const result = state.valueFrom.inputValueFrom * state.convertCoefficient;
        setValueTo((Math.round(result*100)/100).toString(10));
        e.preventDefault();
    };


    window.state = state;
    return (
        <div>
            <form onSubmit={(e) => getConvertionResult(e)}>
                <FormControl>
                    <FormHelperText>to</FormHelperText>
                    <Select
                        value={currencyTo.selectedCurrencyTo}
                        onChange={changeCurrencyTo}
                        name="selectedCurrencyTo"
                    >
                        {Object.keys(state.rates)
                            .map(
                                (r, i) => {
                                    return (<MenuItem key={i} value={r}>{r}</MenuItem>);
                                }
                            )}
                    </Select>
                </FormControl>
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

export default ConverterConteiner;


