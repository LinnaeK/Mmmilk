fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://linnae:testing3@cluster0-vvyen.mongodb.net/mmmilk?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
mongoose.Promise = global.Promise;

var milkData = new mongoose.Schema({
    Dataflow: String,
    REF_AREA: String,
    INDICATOR: String,
    SEX: String,
    TIME_PERIOD: String,
    OBS_VALUE: Number,
    UNIT_MULTIPLIER: String,
    UNIT_MEASURE: String,
    OBS_STATUS: String,
    OBS_CONF: String,
    LOWER_BOUND: Number, 
    UPPER_BOUND: Number,
    WGTD_SAMPL_SIZE: String,
    OBS_FOOTNOTE: String, 
    SERIES_FOOTNOTE: String,
    DATA_SOURCE: String, 
    Source_link: String,
    CUSTODIAN: String, 
    TIME_PERIOD_METHOD: String,
    REF_PERIOD: String,
    COVERAGE_TIME: String,
    AGE: String
})

var d = fs.readFileSync('/Users/linnaekraemer/Downloads/csvjson.json', 'utf8', (err, data) => {
    if (err) throw err
    return(d)
})

var e = JSON.parse(d)

var BreastfeedingMamas = mongoose.model('MilkData', milkData)

for(record in e){
    var newRecord = new BreastfeedingMamas(newRecord)
    console.log(newRecord)
    newRecord.save(function(err) {
        if(err)return console.log(err)
    })
}