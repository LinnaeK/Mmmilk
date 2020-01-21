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

async function getPerYear(comparisonCategory, comparison, subCat, yearAvgs){
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
            // console.log(yearAvgs)
    return yearAvgs
}

function createArray (obj){
    let newArr = []
    for(o in obj){
        newArr.push(obj[o])
    }
    return newArr
}

async function getData(comparisonCategory, comparison, subCats){
    try{
        if(comparisonCategory==="Country"){
            subCat1 = await getPerYear(comparisonCategory, comparison, subCats[0], {})
            subCat2 = await getPerYear(comparisonCategory, comparison, subCats[1], subCat1)
            subCat3 = await getPerYear(comparisonCategory, comparison, subCats[2], subCat2)
            dataArray=createArray(subCat3)
            return dataArray
        }
    }catch(e){
        console.log(e)
    }
}

getData("Country","NPL",['NT_BF_PRED_BF', 'NT_BF_EIBF', 'NT_BF_EXBF'])
 