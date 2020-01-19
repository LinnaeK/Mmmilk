mongoose  = require('mongoose')
Schema  = mongoose.Schema
var Float  = require('mongoose-float').loadType(mongoose)

const milkDataSchema  = new Schema({
     Dataflow   :  String ,
       geographicArea   :  String ,
       Indicator   :  String ,
       Sex   :  String ,
       timePeriod   : Number,
       observationValue   : {type: Float},
       unitMultiplier   :  Number ,
       unitOfMeasure   :  Schema.Types.Mixed ,
       observationStatus   :  String ,
       observationConfidentaility   :  String ,
       lowerBound   : {type: Float},
       upperBound   : {type: Float},
       weightedSampleSize   : {type: Float},
       observationFootnote   : String  ,
       seriesFootnote   :  String ,
       citation   :  String,
       Custodian   :  String,
       timePeriod   :  String ,
       referencePeriod   :  String ,
       timeDataWasProvided   :  String ,
       currentAge   :  String
})

module.exports = mongoose.model('Chart', chartSchema)