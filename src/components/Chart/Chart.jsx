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
        }else if (this.props.user){
            renderLineChart = (
                <h1> Please select options from the left bar to create your chart </h1>
            )
        }else{
            renderLineChart = (
                <>
                    <h1> Welcome to Mama's Milk! </h1>
                    <h3>Sign in to create your own breastfeeding statistic charts </h3>
                </>
            ) 
        }}
 
        return(
            <div>
                    {renderLineChart}
            </div>
        )
    }
  }

export default Chart