import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

export default function ButtonSizes(props) {
    const classes = useStyles();
  
    return (
      <div>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={props.handleResetClick}>
            Reset
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin}>
            Save 
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={props.handleChartClick}>
            Create Chart 
        </Button>
    </div>
    )
}