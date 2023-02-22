const mongoose = require("mongoose");
const Joi = require("joi");

//towns Schema
const townSchema = new mongoose.Schema({
    country_name: String,
    town_name: String,
    town_info: String,
    userId_created: String,
    date_created: {
        type: Date, default: Date.now
    }
})
exports.TownModel = mongoose.model("towns", townSchema);

//Joi check 
exports.validateTown = (_reqBody) => {
    let joiSchema = Joi.object({
        country_name: Joi.string().min(1).max(150).required(),
        town_name: Joi.string().min(1).max(150).required(),
        town_info: Joi.string().min(1).max(150).required()
    })
    return joiSchema.validate(_reqBody);
}