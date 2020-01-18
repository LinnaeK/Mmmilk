mongoose = require('mongoose')
Schema = mongoose.Schema

const chartSchema = new Schema({
    countries = Array,
    years = Array,
    indicators = Array,
    data = Array
})