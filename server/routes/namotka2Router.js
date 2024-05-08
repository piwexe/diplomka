const Router = require('express')
const router = new Router()
const namotka2Controller = require('../controllers/namotka2Controller')

router.get('/getAllEntries', namotka2Controller.getAllEntries)
router.get('/getEntryById',namotka2Controller.getEntryById)

module.exports = router