const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chartSchema = new Schema({
    countries : [String],
    years : Array,
    indicators : Array,
    data : Array
})

module.exports = mongoose.model('Chart', chartSchema)