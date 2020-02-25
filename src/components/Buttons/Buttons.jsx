import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './Buttons.js'

export default function ButtonSizes(props) {
    const classes = useStyles();
  
    return (
      <div>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={props.handleChartClick}>
            Create Chart 
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={props.handleResetClick}>
            Reset
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={props.handleSaveClick}>
            Save 
        </Button>
    </div>
    )
}