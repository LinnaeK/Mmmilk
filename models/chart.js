const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chartSchema = new Schema({
    user: String,
    country : [String],
    comparisonByItem : String,
    indicators : [String],
})

module.exports = mongoose.model('Chart', chartSchema)

