const mongoose = require("mongoose");
const Joi = require("joi");

//places Schema
const placeSchema = new mongoose.Schema({
    userId_created: String,
    townId_name: String,
    name: String,
    info: String,
    img_url: String,
    location: Array,
    isBetChabad: Boolean,
    date_created: {
        type: Date, default: Date.now
    }
})

exports.PlaceModel = mongoose.model("places", placeSchema);

//joi checking
exports.validatePlace = (_reqBody) => {
    let joiSchema = Joi.object({
        townId_name: Joi.string().min(1).max(150).required(),
        name: Joi.string().min(1).max(150).required(),
        info: Joi.string().min(1).max(150).required(),
        img_url: Joi.string().min(1).max(150),
        location: Joi.array().min(1).max(150).required(),
        isBetChabad: Joi.boolean().required(),

    })
    return joiSchema.validate(_reqBody);
}