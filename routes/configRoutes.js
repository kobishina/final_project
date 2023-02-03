//define the routers
const indexR = require("./index");
const usersR = require("./users");
const tripsR = require("./trips");

//define rout for every page
exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/trips", tripsR);
}