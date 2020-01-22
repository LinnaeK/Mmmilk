import tokenService from './tokenService'

const BASE_URL = '/api/data/'

export default {
    index
}

async function index(comparisonCategory, country, indicators){
    try{
    const options = {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+tokenService.getToken(),
            'indicators':indicators,
            'country':country,
            'comparisoncategory': comparisonCategory
        }
    }

    let reqData = await fetch(BASE_URL, options)
    reqData = await reqData.json()
    return reqData
}catch(e){
    console.log(e)
    return e
}
}