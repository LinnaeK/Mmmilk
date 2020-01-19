let express = require('express')
let router = express.Router()
let chartsCtrl = require('../../controllers/charts')

router.get('/', chartsCtrl.index),
router.get('/:id', chartsCtrl.show),
router.post('/', chartsCtrl.create),
router.delete('/:id', chartsCtrl.delete)