const express = require("express");
const cors = require("cors");
const {readdirSync} = require('fs');
const {connect} = require("./db/db.js")
require('dotenv').config();


const app = express();
const PORT = 5000

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    try {
        connect();
        app.listen( 5000 , () => {
            console.log(`The server is listening at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("MONGO DB Connection Failed.");
    }
}

server()