import React, {useEffect, useReducer} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getAllRates, getSelectedRates} from "../api/api";
import TextField from '@material-ui/core/TextField';


const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

const initState = {
  currencyTo: {selectedCurrencyTo: ''},
  currencyFrom: {selectedCurrencyFrom: ''},
  ratesTo: [],
  ratesFrom: [],
  convertCoefficient: 1,
  valueFrom: 1,
  valueTo: 1
};


const ConverterContainer = () => {

    const [state, setState] = useReducer(reducer, initState);

    useEffect(
        () => {
            getAllRates()
                .then(data => {
                    const mas = Object.keys(data.rates);
                    setState({ratesFrom: mas});
                    setState({ratesTo: mas});
                });
        }, []);


    useEffect(() => {
        const result = state.valueFrom * state.convertCoefficient;
        setState({valueTo: (Math.round(result * 100) / 100).toString(10)});
    }, [state.convertCoefficient]);


    const changeCurrency = (event) => (property) => {
        setState({[property]:
            {[event.target.name]: event.target.value}
      })
    };

    const changeValueFrom = name => event => {
        setState({[name]: parseInt(event.target.value, 10)});
    };
    const getConvertionResult = (e) => {
        getSelectedRates(state.currencyFrom.selectedCurrencyFrom, state.currencyTo.selectedCurrencyTo)
            .then(data => {
                setState({convertCoefficient: data.rates[state.currencyTo.selectedCurrencyTo]});
            });
        e.preventDefault();
    };

    window.state = state;
    return (
        <div>
            <form onSubmit={(e) => getConvertionResult(e)}>
                <div>
                    <FormControl>
                        <FormHelperText>from</FormHelperText>
                        <Select
                            value={state.currencyFrom.selectedCurrencyFrom}
                            onChange={(e) => changeCurrency(e)("currencyFrom")}
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
                            value={state.currencyTo.selectedCurrencyTo}
                            onChange={(e) => changeCurrency(e)("currencyTo")}
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
                        value={state.valueFrom}
                        onChange={changeValueFrom('valueFrom')}
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


