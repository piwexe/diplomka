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
        
        let whereCondition = {};
    
        if (start && end) {
            const startingDate = new Date(start);
            const endDate = new Date(end);
            whereCondition.startDate = {
                [Op.between]: [startingDate, endDate]
            };
        }
    
        try {
            const rawRoll = await RawRoll.findAll({
                where: whereCondition
            });
            return res.json(rawRoll);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    
    

    async getEntryById(req, res) {
        
    }

}

module.exports = new rawRollController()