//cargar modulos
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

// conectarse a bd
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.CONNECT_STRING}/`)
    .then(() => {
        console.log("OK - Success to connect to DB");
        app.listen(process.env.PORT, () => {
            console.log(`OK - Serves is running in http://${process.env.HOST}`);
        })
    })
    .catch(err => console.log("ERR - Error to connect to DB: ",err));
// app.listen(process.env.PORT, () => {
//                 console.log(`OK - Serves is running in http://${process.env.HOST}`);
//             })