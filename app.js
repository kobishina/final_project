// build the server using express server
const express = require("express");
// path for public dir
const path = require("path");
// the server are in http
const http = require("http");
// cors allowd you connect for diffrent address without security problem
const cors = require("cors");
// allowd you uploads file into a public filder
const fileUpload = require("express-fileupload");

//call to the routs from routsInit.js file
const { routesInit } = require("./routes/configRoutes");
//oppereting Mongo Server
require("./db/mongoConnect");

const app = express();
//middelware for cors
app.use(cors());

//fileUploading
app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 }
}))

//the server can get info of json even  not using a get method
app.use(express.json());
//expose public folder to client side
app.use(express.static(path.join(__dirname, "public")));

//send to routs the capability of app
routesInit(app);

//connect to server with ability of app use the Express
const server = http.createServer(app);
//define the port , and default port
let port = process.env.PORT || 3002;
//start the server and listin to the port
server.listen(port);
