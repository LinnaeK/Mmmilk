import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useStyles from './SelectComparison.js'

SelectComparison.propTypes = {
    
};

  
  // Inspired by blueprintjs
  function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        onClick={props.handleRadioClick}
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }


function SelectComparison(props) {
    let selection = props.user ?
    <div>
        <FormControl component="fieldset">
        <FormLabel component="legend">Compare By:</FormLabel>
        <RadioGroup defaultValue="Country" aria-label="Compare By" name="customized-radios">
            <FormControlLabel value="Country" name = "comparisonByItem" control={<StyledRadio handleRadioClick={props.handleRadioClick} />} label="Country"  />
            <FormControlLabel value="Age" name = "comparisonByItem" control={<StyledRadio handleRadioClick={props.handleRadioClick}/>} label="Age" />
        </RadioGroup>
        </FormControl>
    </div>
    :
    <div></div>
    return (
        <div>
            {selection}
        </div>
    );
}

export default SelectComparison;