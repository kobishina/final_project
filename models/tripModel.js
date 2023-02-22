const mongoose = require("mongoose");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");


const tripSchema = new mongoose.Schema({


    travel_purpose: String,
    travel_dates: String,
    comments: String,
    score: Number,
    userId_created: String,
    townId_name: String,
    place_id: String,
    date_created: {
        type: Date, default: Date.now
    }
})
exports.TripModel = mongoose.model("trips", tripSchema);

//לכאורה אין צורך בזה כאן 
// //createing token that includs the role if admin or user and valid for 10 hours
// exports.createToken = (user_id, role) => {
//     let token = jwt.sign({ id: user_id, role: role }, "kobiProject", { expiresIn: "600mins" });
//     return token;
// }



//check by joi if put correct detsils and check in server side before sending to the DB
exports.validateTrip = (_reqBody) => {
    let joiSchema = Joi.object({

        townId_name: Joi.string().min(2).max(150).required(),
        travel_purpose: Joi.string().min(3).max(150).required(),
        travel_dates: Joi.string().min(2).max(150).required(),
        comments: Joi.string().min(2).max(150).required(),
        score: Joi.number().min(2).max(150).required(),
        place_id: Joi.string().min(1).max(150).required()
    })
    return joiSchema.validate(_reqBody);
}
