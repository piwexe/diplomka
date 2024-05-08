const Router = require('express')
const router = new Router()
const namotka1Router = require('./namotka1Router');
const namotka2Router = require('./namotka2Router');
const namotka3Router = require('./namotka3Router');
const userRouter = require('./userRouter');
const rawRollRouter = require('./rawRollRouter');

// Подключение маршрутов для трех таблиц
router.use('/namotka1', namotka1Router);
router.use('/namotka2', namotka3Router);
router.use('/namotka3', namotka3Router);
router.use('/user', userRouter);
router.use('/rawRoll', rawRollRouter);

module.exports = router