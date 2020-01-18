let Quote = require('../models/cart.js')

module.exports = {
    index,
    create,
    show, 
    delete: deleteChart
}

async function create(req, res){
    try{
        const { _id, data, countries, indicators, years, data } = req.body
        newQuote = await new Quote({
            _id,
            data,
            countries,
            indicators, 
            years, 
            data
        })
        const saved = await Quote.save()
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