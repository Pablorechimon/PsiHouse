//cargar modulos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('../doc/swagger.json');

const app = express();
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

//routes
const apiRoutes = require('./routes/api.routes.js');
app.use('/', apiRoutes);
// app.use('', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//export
module.exports = app;