import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
//   const [state, setState] = React.useState({
//     twelveToFifteen: false,
//     twelveToTwentyThree: false,
//     twentyToTwentyThree: false,
//     zeroToTwentyThree: false,
//     eZeroToFive: false,
//     pZeroToFive: false,
//   });

//   const handleChange = name => event => {
//     setState({ ...state, [name]: event.target.checked });
//   };

//   const { twelveToFifteen, twelveToTwentyThree, twentyToTwentyThree, zeroToTwentyThree, eZeroToFive, pZeroToFive } = state; 
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;
    console.log('test', props.pZeroToFive, props.isEnabled)
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Age Ranges</FormLabel>
        <FormGroup>
        <FormHelperText>{props.ageMessage}</FormHelperText>
          <FormControlLabel
            disabled={!props.isEnabled&&!props.eZeroToFive}
            control={<Checkbox checked={props.eZeroToFive} onChange={props.handleChange('eZeroToFive')} value="E0-5" onClick={props.handleAgeClick} />}
            label="Exclusively breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.pZeroToFive}
            control={<Checkbox checked={props.pZeroToFive} onChange={props.handleChange('pZeroToFive')} value="P0-5" onClick={props.handleAgeClick} />}
            label="Predonimantly breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twelveToFifteen}
            control={
              <Checkbox checked={props.twelveToFifteen} onChange={props.handleChange('twelveToFifteen')} value="12-15" onClick={props.handleAgeClick} />
            }
            label="12-15 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twelveToTwentyThree}
            control={
              <Checkbox checked={props.twelveToTwentyThree} onChange={props.handleChange('twelveToTwentyThree')} value="12-23" onClick={props.handleAgeClick} />
            }
            label="12-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twentyToTwentyThree}
            control={
              <Checkbox checked={props.twentyToTwentyThree} onChange={props.handleChange('twentyToTwentyThree')} value="20-23" onClick={props.handleAgeClick} />
            }
            label="20-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.zeroToTwentyThree}
            control={
              <Checkbox checked={props.zeroToTwentyThree} onChange={props.handleChange('zeroToTwentyThree')} value="0-23" onClick={props.handleAgeClick} />
            }
            label="0-23 months"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
