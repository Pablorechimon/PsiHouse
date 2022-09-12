const Historia = require("../models/historia.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Historia.find().then((historia) => {
    res.status(200).json({
        message: 'Historias retrieved successfully',
        data: historia,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding historia",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}