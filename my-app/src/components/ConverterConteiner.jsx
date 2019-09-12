import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getAllRates} from "../api/api";

const ConverterConteiner = () => {
    const [values, setValues] = React.useState({
        currencyFrom: ''
    });

    const [rates, setRates] = React.useState({
       objectRates: {}
    });

    const state = {values, rates};

    React.useEffect(() => {
        getAllRates()
            .then(data => {
                setRates(data.rates);
            });
    }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log(state.rates[event.target.value]);
    }
    return (
        <div>
            <form>
                <FormControl>
                    <FormHelperText>to</FormHelperText>
                    <Select
                        value={values.currencyFrom}
                        onChange={handleChange}
                        name="currencyFrom"
                    >
                        {Object.keys(state.rates)
                            .map(
                                (r, i) => {
                               return(<MenuItem key={i} value={r}>{r}</MenuItem>);
                           }
                        )}
                    </Select>
                </FormControl>
            </form>
        </div>
    );
};

export default ConverterConteiner;
