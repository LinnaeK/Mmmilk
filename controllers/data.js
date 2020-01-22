let MilkData = require('../models/data.js')

module.exports = {
    index,
    // create,
    // show, 
    // delete: deleteChart
}

// important aggregation code:
// // aggregate( [ { $group : { _id : "$item" } } ] )
// let countries = await MilkData.aggregate([{$group:{_id:"$REF_AREA"}}])

// IndicatorsCodes = [
//     {'NT_BF_CBF_12_23':'12-23' },
//     {'NT_BF_EIBF':'Early Initiation' },
//     {'NT_BF_EBF':'Ever Breastfed' },
//     {'NT_BF_PRED_BF': 'Predominantly Breastfed 0-5'},
//     {'NT_BF_CBF_12_15': '12-15'},
//     {'NT_BF_EXBF': 'Exclusviely Breastfed 0-5'},
//     {'NT_BF_CBF_20_23': '20-23' }
//   ]

async function index(req, res){
    try{
        // console.log(indArr)
        console.log(req.headers.country)
        console.log(req.headers.comparisoncategory)
        if(req.headers.comparisoncategory==="Country"){
            let indArr = req.headers.indicators
            indArr=indArr.split(",")
            console.log("in if statement")
            let response = await getData(req.headers.country, indArr)
            console.log('I got me a: ', response)
            res.json(response)
        }else{
            console.log("in the else statement!!")
            // need to write this code
        }
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

async function getPerYear(comparison, subCat, yearAvgs){
    subCatData = await MilkData.find({REF_AREA:comparison,INDICATOR:subCat})
            let byYears= {}
            for(let i = 0; i<subCatData.length; i++){
                if(byYears[subCatData[i].TIME_PERIOD]){
                    byYears[subCatData[i].TIME_PERIOD].obs_value+=parseInt(subCatData[i].OBS_VALUE)
                    byYears[subCatData[i].TIME_PERIOD].obs_times += 1
                }else{
                    byYears[subCatData[i].TIME_PERIOD]=
                    {obs_value: parseInt(subCatData[i].OBS_VALUE),
                    obs_times: 1}
                    
                }
            }

            for (const year in byYears){
                if(!yearAvgs[year]){
                    yearAvgs[year] = {}}
                yearAvgs[year][subCat]=byYears[year].obs_value/byYears[year].obs_times
                yearAvgs[year]["year"]=year
            }
    return yearAvgs
}

function createArray (obj){
    let newArr = []
    for(o in obj){
        newArr.push(obj[o])
    }
    return newArr
}

async function getData(comparison, subCats){
    try{
            subCat1 = await getPerYear(comparison, subCats[0], {})
            subCat2 = await getPerYear(comparison, subCats[1], subCat1)
            subCat3 = await getPerYear(comparison, subCats[2], subCat2)
            dataArray=createArray(subCat3)
            console.log('got data array: ', dataArray)
            return dataArray
        }catch(e){
        console.log(e)
    }
}

//
//
//
async function getCountries(){
    console.log('ran getCountries')
    try{
        console.log('in try')
        let countries = await MilkData.aggregate([{$group:{_id:"$REF_AREA"}}])
        console.log(countries)
        console.log('at end of getCountries')
    }catch(e){
        console.log('in error')
        console.log(e)
    }
}
console.log('ran data.js')

getCountries()