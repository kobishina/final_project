//define the routers
const indexR = require("./index");
const usersR = require("./users");
const tripsR = require("./trips");
const townsR = require("./towns");
const placesR = require("./places");
const uploadR = require("./upload");

//define rout for every page
exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/trips", tripsR);
    app.use("/towns", townsR);
    app.use("/places", placesR);
    app.use("/upload", uploadR);
}