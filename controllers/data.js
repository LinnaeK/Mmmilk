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
//    - {'NT_BF_CBF_12_23':'12-23' },
//     {'NT_BF_EIBF':'Early Initiation' },
//    - {'NT_BF_EBF':'Ever Breastfed' },
//    - {'NT_BF_PRED_BF': 'Predominantly Breastfed 0-5'},
//    - {'NT_BF_CBF_12_15': '12-15'},
//    - {'NT_BF_EXBF': 'Exclusviely Breastfed 0-5'},
//    - {'NT_BF_CBF_20_23': '20-23' }
//   ]

async function index(req, res){
    try{
        // console.log(indArr)
        console.log(req.headers.country)
        console.log(req.headers.comparisoncategory)
        if(req.headers.comparisoncategory==="Country"){
            console.log('in index', req.headers.comparisoncategory)
            let indArr = req.headers.indicators
            indArr=indArr.split(",")
            console.log("in if statement")
            let response = await getCountryData(req.headers.country, indArr)
            console.log('I got me a: ', response)
            res.json(response)
        }else{
            console.log("in the else statement!!")
            let ctryArr = req.headers.country
            ctryArr = ctryArr.split(",")
            console.log('getting ready to run getAgeData: ', req.headers.indicators, ctryArr)
            let response = await getAgeData(req.headers.indicators, ctryArr)
            console.log(response)
            res.json(response)
        }
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

async function getPerYear(comparison, subCat, yearAvgs){
    subCatData = await MilkData.find({REF_AREA:comparison,INDICATOR:subCat})
    console.log(subCatData, 'subCatData')
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
    console.log('yearAvgs', yearAvgs)
    return yearAvgs
}

function createArray (obj){
    let newArr = []
    for(o in obj){
        newArr.push(obj[o])
    }
    return newArr
}

async function cleanDataArray(arr, countries){
    let country
    let currentObj  
      for(let cNum = 0; cNum < countries.length; cNum++){
        country = countries[cNum]
          let searchArr = []
          for(let objNum = 0; objNum < arr.length; objNum++){
            currentObj = arr[objNum]
              if(currentObj[country]){
                  searchArr.push(currentObj[country])
              }else{
                  if(searchArr.length>0){
                      currentObj[country]=searchArr[searchArr.length-1]
                  }else{
                      let searchValue = objNum
                      while(!arr[searchValue][country]&&searchValue!==arr.length){
                          searchValue += 1
                      }
                      currentObj[country] = arr[searchValue][country]
                  }
              }
          }
      }
      return arr
  }
  

async function getCountryData(comparison, subCats){
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

// async function getPerCountry(comparison, subCat, yearAvgs){
async function getPerCountry(country, indicator, yearAvgsObj){
    countryData = await MilkData.find({REF_AREA:country,INDICATOR:indicator})
            let byYears= {}
            for(let i = 0; i<countryData.length; i++){
                if(byYears[countryData[i].TIME_PERIOD]){
                    byYears[countryData[i].TIME_PERIOD].obs_value+=parseInt(countryData[i].OBS_VALUE)
                    byYears[countryData[i].TIME_PERIOD].obs_times += 1
                }else{
                    byYears[countryData[i].TIME_PERIOD]=
                    {obs_value: parseInt(countryData[i].OBS_VALUE),
                    obs_times: 1}
                    
                }
            }
            
            for (const year in byYears){
                if(!yearAvgsObj[year]){
                    yearAvgsObj[year] = {}}
                yearAvgsObj[year][country]=byYears[year].obs_value/byYears[year].obs_times
                yearAvgsObj[year]["year"]=year
            }
    return yearAvgsObj
}

async function getAgeData(indicator, countries){
    // console.log(indicator, countries)
    country1 = await getPerCountry(countries[0], indicator, {})
    // console.log('country1', country1)
    country2 = await getPerCountry(countries[1], indicator, country1)
    country3 = await getPerCountry(countries[2], indicator, country2)
    let array = createArray(country3)
    array = cleanDataArray(array, countries)
    console.log('clean Data Array', cleanDataArray)
    return array
}
//
//
//
async function getCountries(){
    console.log('ran getCountries')
    try{
        console.log('in try')
        // let countries = await MilkData.aggregate([{$group:{_id:"$REF_AREA"}}])
        MilkData.find({}).distinct('REF_AREA', function(err, country){
            if(err){
                console.log(err)
            }
            console.log('in inner function')
            console.log(country)
        })
        // MilkData.collection.distinct("REF_AREA", function(err, results){
        //     if(err){
        //         console.log(err)
        //     }
        //     console.log(results)
        //     // return results
        // })
        // console.log(countries)
        console.log('at end of getCountries')
    }catch(e){
        console.log('in error')
        console.log(e)
    }
}
console.log('ran data.js')

getCountries()