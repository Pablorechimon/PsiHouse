const Tarea = require("../models/tarea.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Tarea.find().then((tarea) => {
    res.status(200).json({
        message: 'Tarea retrieved successfully',
        data: tarea,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding tarea",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}