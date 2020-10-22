const express = require('express')
const app = express()
const request = require('request')
const bodyParser = require("body-parser");
const server = require('http').createServer(app)
const path = require('path');
import routes from './routes/routeController';
server.listen(process.env.PORT || 3001)
app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);