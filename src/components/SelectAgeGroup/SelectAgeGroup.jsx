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
//     everBF: false,
//     eZeroToFive: false,
//     pZeroToFive: false,
//   });

//   const handleChange = name => event => {
//     setState({ ...state, [name]: event.target.checked });
//   };

//   const { twelveToFifteen, twelveToTwentyThree, twentyToTwentyThree, everBF, eZeroToFive, pZeroToFive } = state; 
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
            control={<Checkbox checked={props.eZeroToFive} onChange={props.handleChange('eZeroToFive')} value="NT_BF_EXBF" onClick={props.handleAgeClick} />}
            label="Exclusively breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.pZeroToFive}
            control={<Checkbox checked={props.pZeroToFive} onChange={props.handleChange('pZeroToFive')} value="NT_BF_PRED_BF" onClick={props.handleAgeClick} />}
            label="Predonimantly breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twelveToFifteen}
            control={
              <Checkbox checked={props.twelveToFifteen} onChange={props.handleChange('twelveToFifteen')} value="NT_BF_CBF_12_15" onClick={props.handleAgeClick} />
            }
            label="12-15 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twelveToTwentyThree}
            control={
              <Checkbox checked={props.twelveToTwentyThree} onChange={props.handleChange('twelveToTwentyThree')} value="NT_BF_CBF_12_23" onClick={props.handleAgeClick} />
            }
            label="12-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.twentyToTwentyThree}
            control={
              <Checkbox checked={props.twentyToTwentyThree} onChange={props.handleChange('twentyToTwentyThree')} value="NT_BF_CBF_20_23" onClick={props.handleAgeClick} />
            }
            label="20-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.everBF}
            control={
              <Checkbox checked={props.everBF} onChange={props.handleChange('everBF')} value="NT_BF_EBF" onClick={props.handleAgeClick} />
            }
            label="Breastfed at least once"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
