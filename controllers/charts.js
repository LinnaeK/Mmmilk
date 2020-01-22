let Chart = require('../models/chart.js')

module.exports = {
    index,
    create,
    show, 
    delete: deleteChart
}

async function create(req, res){
    console.log('in create function')
    console.log(req.body)
    try{
        const { comparisonByItem, country, indicators } = req.body
        newChart = await new Chart({
            user: req.user,
            comparisonByItem,
            country,
            indicators
        })
        const saved = await  newChart.save()
        res.json(saved)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

async function index(req, res){
    try{
        charts = await Chart.find({})
        res.status(200).json(charts)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

async function show(req, res){
    try{
        chart = await Chart.find({ _id: req.body._id })
        res.status(200).json(chart)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

async function deleteChart(req, res){
    try{
        let chart = await Chart.findOne({ _id: req.body_id })
        let success = await removedItem.remove(chart)
        res.status(200).json(success)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}