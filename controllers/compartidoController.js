const Compartido = require("../models/compartido.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Compartido.find().then((compartido) => {
    res.status(200).json({
        message: 'Compartido retrieved successfully',
        data: compartido,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding compartido",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}