const Conceptualizacion = require("../models/conceptualizacion.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Conceptualizacion.find().then((conceptualizacion) => {
    res.status(200).json({
        message: 'Conceptualizacion retrieved successfully',
        data: conceptualizacion,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding conceptualizacion",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}