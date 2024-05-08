const {RawRoll} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");

class rawRollController {
    
    async create(req, res, next) {
        try {
            const {name, startDate, endDate, status, weight} = req.body
            const rawRoll = await RawRoll.create({name, startDate, endDate, status, weight})
            return res.json(rawRoll)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
       
    }

    async getAllEntries(req, res, next) {
        const { start, end } = req.query;
        const startingDate = new Date(start);
        const endDate = new Date(end);
        try {
            const rawRoll = await RawRoll.findAll( {
                where: {
                    startDate: {
                      [Op.between]: [startingDate, endDate]
                    }
                  }
            })
            return res.json(rawRoll);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    

    async getEntryById(req, res) {
        
    }

}

module.exports = new rawRollController()