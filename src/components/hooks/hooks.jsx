import {useState, useEffect } from "react"
import chartService from '../../utils/chartService'
import dataService from '../../utils/dataService'

export default function useGetData(user){
    const [savedCharts, setSavedCharts]=useState([])
    const [rawSavedCharts, setRawSavedCharts] =useState([])
    const [loading, setLoading] = useState(true)

    async function fetchData(){
        let viewCharts = await chartService.index()
        console.log('viewCharts', viewCharts)
        let savedCharts = []
        for(let i = 0; i<viewCharts.length; i++){
            let savedData = await dataService.index(viewCharts[i].comparisonByItem, viewCharts[i].country, viewCharts[i].indicators)
            savedCharts.push(savedData)
            console.log('in for loop')
        }
        console.log("me got clicked", viewCharts)
        setRawSavedCharts(viewCharts)
        console.log('useHandleSavedChartsClick')
        setSavedCharts(savedCharts)
        console.log('after useSavedCharts')
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [savedCharts, rawSavedCharts, loading]
}
