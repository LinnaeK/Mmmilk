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
    
  return (
    <div className={classes.root}>
    {console.log('in select age group', props.checkboxes)}
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Age Ranges</FormLabel>
        <FormGroup>
        <FormHelperText>{props.ageMessage}</FormHelperText>
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_EXBF}
            control={<Checkbox checked={props.checkboxes.NT_BF_EXBF}  value="NT_BF_EXBF" onClick={props.handleAgeClick} onChange={props.handleAgeClick}/>}
            // onChange={props.handleChange('eZeroToFive')}
            label="Exclusively breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_PRED_BF}
            control={<Checkbox checked={props.checkboxes.NT_BF_PRED_BF}  value="NT_BF_PRED_BF" onClick={props.handleAgeClick} />}
            // onChange={props.handleChange('pZeroToFive')}
            label="Predonimantly breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_12_15}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_12_15} value="NT_BF_CBF_12_15" onClick={props.handleAgeClick} />
              // onChange={props.handleChange('twelveToFifteen')} 
            }
            label="12-15 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_12_23}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_12_23}  value="NT_BF_CBF_12_23" onClick={props.handleAgeClick} />
              // onChange={props.handleChange('twelveToTwentyThree')}
            }
            label="12-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_20_23}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_20_23}  value="NT_BF_CBF_20_23" onClick={props.handleAgeClick} />
              // onChange={props.handleChange('twentyToTwentyThree')}
            }
            label="20-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_EBF}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_EBF} value="NT_BF_EBF" onClick={props.handleAgeClick} />
              // onChange={props.handleChange('everBF')} 
            }
            label="Breastfed at least once"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
