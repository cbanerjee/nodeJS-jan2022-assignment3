const express = require ("express");

const routes = require("./router/router_controller");
const bodyParser = require("body-parser");
const mongodb = require("./config/mongodb");

const server = express();

mongodb.connect();

server.listen (3000, ()=>{
    console.log("Server is listening");
})

server.use(bodyParser.json());

server.use("/api/", routes);

server.use((req, res)=>{
    res.status(404).send(`Available path list:
    all paths begin with : localhost:3000/api/ <br>
    get - /all <br>
    get - /find/name (requires body for name parameter)    <br>
    get - /topthree    <br>
    patch - /update <br>
    post - /save/<br>
    get - /achiever/    <br>
    get - /dualachiever/ <br>`);
})

server.get("/", (req, res) =>{
    res.end("Hello from Express. You are now connected");
})