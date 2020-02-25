import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './SelectAgeGroup.js'

export default function CheckboxesGroup(props) {
  const classes = useStyles();
   
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Age Ranges</FormLabel>
        <FormGroup>
        <FormHelperText>{props.ageMessage}</FormHelperText>
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_EXBF}
            control={<Checkbox checked={props.checkboxes.NT_BF_EXBF}  value="NT_BF_EXBF" onClick={props.handleAgeClick} onChange={props.handleAgeClick}/>}
            label="Exclusively breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_PRED_BF}
            control={<Checkbox checked={props.checkboxes.NT_BF_PRED_BF}  value="NT_BF_PRED_BF" onClick={props.handleAgeClick} />}
            label="Predonimantly breastfed 0-5 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_12_15}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_12_15} value="NT_BF_CBF_12_15" onClick={props.handleAgeClick} />
            }
            label="12-15 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_12_23}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_12_23}  value="NT_BF_CBF_12_23" onClick={props.handleAgeClick} />
            }
            label="12-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_CBF_20_23}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_CBF_20_23}  value="NT_BF_CBF_20_23" onClick={props.handleAgeClick} />
            }
            label="20-23 months"
          />
          <FormControlLabel
            disabled={!props.isEnabled&&!props.checkboxes.NT_BF_EBF}
            control={
              <Checkbox checked={props.checkboxes.NT_BF_EBF} value="NT_BF_EBF" onClick={props.handleAgeClick} />
            }
            label="Breastfed at least once"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
