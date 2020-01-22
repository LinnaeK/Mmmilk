let express = require('express')
let router = express.Router()
let dataCtrl = require('../../controllers/data')

router.get('/', dataCtrl.index)

module.exports = router