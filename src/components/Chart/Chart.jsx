import React, { Component } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

class Chart extends Component { 
    
    render(){
       let IndicatorsCodes = {
            'NT_BF_CBF_12_23':'12-23 months',
            'NT_BF_EBF':'Ever Breastfed',
            'NT_BF_PRED_BF': 'Predominantly Breastfed 0-5',
            'NT_BF_CBF_12_15': '12-15 months',
            'NT_BF_EXBF': 'Exclusviely Breastfed 0-5',
            'NT_BF_CBF_20_23': '20-23 months',
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

        let dataKeys = []
        let renderLineChart
        {if(this.props.chartData&&this.props.chartData!==[]){
            dataKeys = []
            for(const entry in this.props.chartData[0]){
                if(entry!=='year'){
                    dataKeys.push(entry)
                }
            }

            let compared 
            if(this.props.country.length===1){
                compared = IndicatorsCodes[this.props.country[0]]
            }else{
                compared = IndicatorsCodes[this.props.age[0]]
            }
        
            console.log('dataKeys', dataKeys)
            // renderLineChart = <h1>made it through</h1>
        renderLineChart = (
            <>
            <h1>Comparison of {compared}</h1>
            <LineChart width={600} height={500} data={this.props.chartData}>
                <Line type="monotone" dataKey={dataKeys[0]} stroke="#8884d8" name={IndicatorsCodes[dataKeys[0]]}/>
                <Line type="monotone" dataKey={dataKeys[1]} stroke="#82ca9d" name={IndicatorsCodes[dataKeys[1]]}/>
                <Line type="monotone" dataKey={dataKeys[2]} stroke="#88848d" name={IndicatorsCodes[dataKeys[2]]}/>
                <CartesianGrid stroke='#ccc'/>
                <Legend />
                <XAxis dataKey="year"/>
                <YAxis />
            </LineChart>
            </>
        )
        }else{
            renderLineChart = (
                <h1> Please select options from the left bar to create your chart </h1>
            )
        }}
        // console.log(renderLineChart)
        return(
            <div>
                    {renderLineChart}
            </div>
        )
    }
  }

//   export default Chart


// export default class Chart extends Component {

//   render() {
//       let BarChart
//  {if(this.props.chartData){
//     let dataKeys = []
//     let renderLineChart
//     console.log("in chart" , this.props.chartData[0])
//     dataKeys = []
//     for(const entry in this.props.chartData[0]){
//         if(entry!=='year'){
//             dataKeys.push(entry)
//         }
//         }

//      BarChart = 
//         <BarChart
//           width={500}
//           height={300}
//           data={this.props.chartData}
//           margin={{
//             top: 5, right: 30, left: 20, bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timePeriod" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey={dataKeys[0]} fill="#8884d8" />
//           <Bar dataKey={dataKeys[1]} fill="#82ca9d" />
//           <Bar dataKey={dataKeys[2]} fill="#82cd9a" />
//         </BarChart>
//       }else{
//           BarChart = <h1>select options from left</h1>
//       }}
//     return (
//         <div>
//             {BarChart}
//         </div>
//     );
//   }
// }
export default Chart