const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chartSchema = new Schema({
    countries = Array,
    years = Array,
    indicators = Array,
    data = Array
})

module.exports = mongoose.model('Chart', chartSchema)