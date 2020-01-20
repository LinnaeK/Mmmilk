import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'United States',
    'Canada',
    'England',
    'Chile',
    'Egypt',
    'Brazil',
    'Japan',
    'Congo',
    'Mexico',
    'Romania'
]

function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    };
}

export default function SelectCountry(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = event => {
      setPersonName(event.target.value);
    };
  
    const handleChangeMultiple = event => {
      const value = [...personName];
      const { options } = event.target;
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setPersonName(value);
    };
  

SelectCountry.propTypes = {
    
};
    return (
        <div>
           <FormControl className={classes.formControl} >
            <InputLabel shrink htmlFor="select-multiple-native" name="country">
            Countries
            </InputLabel>
            <FormHelperText>{props.countryMessage}</FormHelperText>
            <Select
                multiple
                native
                value={personName}
                name="country"
                onChange={handleChangeMultiple}
                // onClick={props.handleRadioClick}
                inputProps={{
                    id: 'select-multiple-native',
                }}
                >
                {names.map(named => (
                    <option key={named} value={named} name="country" onClick={props.handleCountryClick} >
                        {named}
                        </option>
                ))}
            </Select>
        </FormControl> 
        </div>
    );
}
  
