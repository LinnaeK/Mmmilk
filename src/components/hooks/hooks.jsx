import {useState, useEffect } from "react"
import chartService from '../../utils/chartService'
import dataService from '../../utils/dataService'

// function useGetData(user){
//     const [savedCharts, setSavedCharts]=useState([])
//     const [rawSavedCharts, setRawSavedCharts] =useState([])
//     const [loading, setLoading] = useState(true)

//     async function fetchData(){
//         let viewCharts = await chartService.index()
//         console.log('viewCharts', viewCharts)
//         let savedCharts = []
//         for(let i = 0; i<viewCharts.length; i++){
//             let savedData = await dataService.index(viewCharts[i].comparisonByItem, viewCharts[i].country, viewCharts[i].indicators)
//             savedCharts.push(savedData)
//             console.log('in for loop')
//         }
//         console.log("me got clicked", viewCharts)
//         setRawSavedCharts(viewCharts)
//         console.log('useHandleSavedChartsClick')
//         setSavedCharts(savedCharts)
//         console.log('after useSavedCharts')
//         setLoading(false)
    

//     useEffect(() => {
//         fetchData()
//     }, [])

//     return [savedCharts, rawSavedCharts, loading]
//     }
// }

export function useRawSavedData(){
    const [rawSavedCharts, getRawSavedCharts ] = useState([])
    let loading = null
    
    async function fetchData(){
        let viewCharts = await chartService.index()
        getRawSavedCharts(viewCharts)
        loading="done"
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    console.log("in Hooks rawSavedCharts", rawSavedCharts)
    return [rawSavedCharts, getRawSavedCharts]
}
    
export function useSavedChartsData(){
    const [savedChrts, getSavedChrts] = useState([])
    const [rawSavedCharts, useRawSavedCharts] = useState([])
    
    
    
    async function fetchData(){
        let savedCharts = []
        console.log('RSC.length', rawSavedCharts.length)
          for(let i = 0; i<rawSavedCharts.length; i++){
            let savedData = await dataService.index(rawSavedCharts[i].comparisonByItem, rawSavedCharts[i].country, rawSavedCharts[i].indicators)
            savedCharts.push(savedData)
            console.log('in for loop')
            console.log('in fetch data', savedData)
          }
        getSavedChrts(savedCharts)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log("in hooks savedCharts", savedChrts)
    return [savedChrts, getSavedChrts]
    }


export default { useRawSavedData, useSavedChartsData }
