const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

//schema for user that shuld have thoose params
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birth_year: String,
    phone: String,
    date_created: {
        type: Date, default: Date.now
    },
    role: {
        //by default the role are user
        type: String, default: "user"
    }
})
exports.UserModel = mongoose.model("users", userSchema);

//createing token that includs the role if admin or user and valid for 10 hours
exports.createToken = (user_id, role) => {
    let token = jwt.sign({ id: user_id, role: role }, "kobiProject", { expiresIn: "600mins" });
    return token;
}

//check by joi if put correct detsils and check in server side before sending to the DB
exports.validateUser = (_reqBody) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(150).required(),
        email: joi.string().min(2).max(150).email().required(),
        password: joi.string().min(3).max(150).required(),
        birth_year: joi.string().min(2).max(150).required(),
        phone: joi.string().min(2).max(150).required()
    })
    return joiSchema.validate(_reqBody);
}

//check the logIn user same check by joi
exports.validateLogin = (_reqBody) => {
    let joiSchema = joi.object({
        email: joi.string().min(2).max(150).email().required(),
        password: joi.string().min(3).max(150).required()
    })
    return joiSchema.validate(_reqBody);
}