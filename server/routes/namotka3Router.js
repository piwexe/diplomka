const Router = require('express')
const router = new Router()
const namotka3Controller = require('../controllers/namotka3Controller')

router.get('/getAllEntries', namotka3Controller.getAllEntries)
router.get('/getEntryById',namotka3Controller.getEntryById)

module.exports = router