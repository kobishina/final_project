//define the routers
const indexR = require("./index");
const usersR = require("./users");

//define rout for every page
exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
}