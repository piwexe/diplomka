const {Namotka} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");

class namotka1Controller {
    
    async getAllEntries(req, res, next) {
        const { start, end, selectedId } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);
        // Создаем объект условий для WHERE запроса
        let whereCondition = {
            time: {
                [Op.between]: [startDate, endDate]
            }
        };
        // Добавляем условие для rawRollId только если selectedId предоставлен
        if (selectedId) {
            whereCondition.rawRollId = selectedId; // selectedId соответствует rawRollId
        }
        try {
            const namotkas = await Namotka.findAll({
                where: whereCondition,
                order: [['time', 'ASC']]
            });
            return res.json(namotkas);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    
    async getGood(req, res, next) {
        const { start, end, selectedId } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);
        let whereCondition = {
            time: {
                [Op.between]: [startDate, endDate]
            },
            validity: true // Добавляем условие, чтобы возвращать только годные намотки
        };
        if (selectedId) {
            whereCondition.rawRollId = selectedId; // Предполагается, что selectedId точно соответствует rawRollId
        }
        try {
            const namotkas = await Namotka.count({
                where: whereCondition
            });
            return res.json(namotkas);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getBad(req, res, next) {
        const { start, end, selectedId } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);
        let whereCondition = {
            time: {
                [Op.between]: [startDate, endDate]
            },
            validity: false // Добавляем условие, чтобы возвращать только негодные намотки
        };
        if (selectedId) {
            whereCondition.rawRollId = selectedId; // Предполагается, что selectedId точно соответствует rawRollId
        }
        try {
            const namotkas = await Namotka.count({
                where: whereCondition
            });
            return res.json(namotkas);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const {length, diameter, weight, time, validity, rawRollId, number} = req.body
            const namotka = await Namotka.create({length, diameter, weight, time, validity, rawRollId,number})
            return res.json(namotka)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getEntryById(req, res) {
        
    }

}

module.exports = new namotka1Controller()