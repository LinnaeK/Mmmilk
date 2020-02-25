import React from 'react'
import Chart from '../Chart/Chart'
import DeleteIcon from '@material-ui/icons/Delete';
import './SavedCharts.css'

function SavedCharts(props) {
    let display 
    {if(props.savedCharts!==[]){
        display = props.savedCharts.map((chart, idx)=>(
            <div className="savedCharts">
                <Chart 
                chartData={chart}
                age={props.rawSavedCharts[idx].indicators}
                country={props.rawSavedCharts[idx].country}
                />
                <DeleteIcon style={{cursor: 'pointer'}} onClick={()=>{props.handleDelete(idx)}}/>
            </div>
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