require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const { RawRoll, User, Namotka} = require('./models/models.js');
const cors = require('cors')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

//Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))
        //RawRoll.sync({ alter: true });
        //Namotka.sync({ alter: true });
    } catch(e){
        console.log(e)
    }
}

start()