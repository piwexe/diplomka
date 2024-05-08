const Router = require('express')
const router = new Router()
const namotka1Controller = require('../controllers/namotka1Controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), namotka1Controller.create)
router.get('/getAllEntries', checkRole('ADMIN'), namotka1Controller.getAllEntries)
router.get('/getEntryById', checkRole('ADMIN'), namotka1Controller.getEntryById)
router.get('/getGood', checkRole('ADMIN'), namotka1Controller.getGood)
router.get('/getBad', checkRole('ADMIN'), namotka1Controller.getBad)

module.exports = router