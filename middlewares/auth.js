//create authnticate for users useing token
const jwt = require("jsonwebtoken");

//the next will work just if pass the res
exports.auth = (req, res, next) => {
    // sending the token in header (not in body that will be expose) and using the x-api-key
    let token = req.header("x-api-key");
    //check if send any token
    if (!token) {
        return res.status(401).json({ msg: "you must send token in header in this endPoint" });
    }
    try {
        //verify the token
        let decodeToken = jwt.verify(token, "kobiProject");
        // when i send it another func can use it by req.tokenData (and after next)
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        // if after all the checking so the token are problem
        return res.status(401).json({ msg: "token invalid or expired" })
    }
}

//auth for admon only
exports.authAdmin = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "you must send token in header in this endPoint" });
    }
    try {
        let decodeToken = jwt.verify(token, "kobiProject");
        if (decodeToken.role != "admin") {

            return res.status(401).json({ msg: "just admin can be in this endPoint" });
        }
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "token invalid Or expired" });
    }
}

