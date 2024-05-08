const Router = require('express')
const router = new Router()
const rawRollController = require('../controllers/rawRollController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), rawRollController.create)
router.get('/getAllEntries', checkRole('ADMIN'), rawRollController.getAllEntries)
router.get('/getEntryById', checkRole('ADMIN'), rawRollController.getEntryById)

module.exports = router