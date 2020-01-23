let express = require('express')
let router = express.Router()
let chartsCtrl = require('../../controllers/charts')

router.get('/', checkAuth, chartsCtrl.index),
router.get('/:id', checkAuth, chartsCtrl.show),
router.post('/', checkAuth, chartsCtrl.create),
router.delete('/:id', checkAuth, chartsCtrl.delete)

function checkAuth(req, res, next) {
  console.log('inAuth')
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;