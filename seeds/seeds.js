require('../config/charts')
const milkData = require('../models/data')
fs = require('fs');

var d = fs.readFileSync('/Users/linnaekraemer/Downloads/milkdata.json', 'utf8', (err, data) => {
	    if (err) throw err
	    return(d)
	})
	
var e = JSON.parse(d)


async function seed(seedArray, doc) {
	let Doc = doc
	seedArray.forEach(async (item, index) => {
		try {
			const newSeed = new Doc({ ...item })
			const savedSeed = await newSeed.save()
			console.log(`item no : ${index} successfully seeded!
                ${savedSeed}
                `)
			return '\nSUCCESS'
		} catch (error) {
			throw new Error(error)
		}
	})
}

seed(e, milkData)