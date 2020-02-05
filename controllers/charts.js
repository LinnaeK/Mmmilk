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
    console.log('in controllers, index')
    try{
        charts = await Chart.find({user:req.user})
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
    console.log('in controller at deleteChart', req.params.id)
    try{
        let success = await Chart.findOneAndDelete({ _id: req.params.id })
        res.status(200).json(success)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}