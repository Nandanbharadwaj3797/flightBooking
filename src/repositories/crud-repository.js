const {Logger}=require('../config')
class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        console.log("Inside create method of CrudRepository");
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: create -> ${error.message}`);
            throw error;
        }
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({ 
                where: { 
                    id:data 
                } 
            });
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: destroy -> ${error.message}`);
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: get -> ${error.message}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: getAll -> ${error.message}`);
            throw error;
        }
    }
    async getone(data) {
        try {
            const response = await this.model.findOne({ where: data });
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: getone -> ${error.message}`);
            throw error;
        }
    }

    async update(id, data) { //data is the object to be updated
        try {
            const response = await this.model.update(data, { where: { id: id } });
            return response;
        } catch (error) {
            Logger.error(`something went wrong in the crud repository: update -> ${error.message}`);
            throw error;
        }
    }
}
module.exports = CrudRepository;