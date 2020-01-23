import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';


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
    let IndicatorsCodes = [
            {'NT_BF_CBF_12_23':'12-23' },
            {'NT_BF_EIBF':'Early Initiation' },
            {'NT_BF_EBF':'Ever Breastfed' },
            {'NT_BF_PRED_BF': 'Predominantly Breastfed 0-5'},
            {'NT_BF_CBF_12_15': '12-15'},
            {'NT_BF_EXBF': 'Exclusviely Breastfed 0-5'},
            {'NT_BF_CBF_20_23': '20-23' }
          ]

          const countryCodes = {
            NPL: 'Nepal',
            ETH: 'Ethiopia',
            GIN: 'Guinea',
            PHL: 'Philippines (the)',
            NGA: 'Nigeria',
            LAO: "Lao People's Democratic Republic (the)",
            MAR: 'Morocco',
            IRQ: 'Iraq',
            JOR: 'Jordan',
            ZAF: 'South Africa',
            AFG: 'Afghanistan',
            PER: 'Peru',
            MLI: 'Mali',
            MRT: 'Mauritania',
            BWA: 'Botswana',
            IDN: 'Indonesia',
            MHL: 'Marshall Islands (the)',
            PRK: "Korea (the Democratic People's Republic of)",
            PRY: 'Paraguay',
            HTI: 'Haiti',
            MDV: 'Maldives',
            LKA: 'Sri Lanka',
            TJK: 'Tajikistan',
            MNG: 'Mongolia',
            CIV: "Côte d'Ivoire",
            BOL: 'Bolivia (Plurinational State of)',
            KGZ: 'Kyrgyzstan',
            PAK: 'Pakistan',
            BEN: 'Benin',
            TUN: 'Tunisia',
            MYS: 'Malaysia',
            SLE: 'Sierra Leone',
            TLS: 'Timor-Leste',
            BFA: 'Burkina Faso',
            BDI: 'Burundi',
            ZMB: 'Zambia',
            UGA: 'Uganda',
            USA: 'United States of America (the)',
            ALB: 'Albania',
            SEN: 'Senegal',
            OMN: 'Oman'
          }
        
        let ccHTML = []
          for(let CC in countryCodes){
              ccHTML.push( <option key={CC} value={CC}  name="country" onClick={props.handleCountryClick} >
              {countryCodes[CC]}
              </option>)
          }
          console.log(ccHTML)

SelectCountry.propTypes = {
    
};
    return (
        <div>
           <FormControl className={classes.formControl} >
            {/* <InputLabel shrink htmlFor="select-multiple-native" name="country">
            Countries
            </InputLabel> */}
            <FormLabel component="legend">Countries</FormLabel>
            <FormHelperText>{props.countryMessage}</FormHelperText>
            <Select
                multiple
                native
                value={props.country}
                name="country"
                onChange={props.handleChangeMultiple}
                inputProps={{
                    id: 'select-multiple-native',
                }}
                >
                {ccHTML}
                
                {/* {names.map(name => (
                    <option key={name} value={name}  name="country" onClick={props.handleCountryClick} >
                        {name}
                        </option>
                ))} */}
            </Select>
        </FormControl> 
        </div>
    )};
            