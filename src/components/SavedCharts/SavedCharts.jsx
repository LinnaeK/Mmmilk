import React from 'react'
import Chart from '../Chart/Chart'
import DeleteIcon from '@material-ui/icons/Delete';

function SavedCharts(props) {
    console.log("in saved charts", props.savedCharts)
    let display 
    {if(props.savedCharts){

        display = props.savedCharts.map((chart, idx)=>(
            <>
            <Chart 
            chartData={chart}
            age={props.rawSavedCharts[idx].indicators}
            country={props.rawSavedCharts[idx].country}
            />
            <DeleteIcon onClick={()=>{props.handleDelete(idx)}}/>
            </>
        ))
    }else{
        display = <h1>This is where your saved charts will be stored</h1>
    }}
    return (
        <div>
            {display}
        </div>
    );
}

export default SavedCharts;