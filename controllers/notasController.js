const Notas = require("../models/notas.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Notas.find().then((notas) => {
    res.status(200).json({
        message: 'Notas retrieved successfully',
        data: notas,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding notas",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}