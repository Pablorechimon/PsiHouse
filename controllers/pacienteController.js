const Paciente = require("../models/paciente.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Paciente.find().then((pacientes) => {
    res.status(200).json({
        message: 'Pacientes retrieved successfully',
        data: pacientes,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding pacientes",
        error: err
    });
   });
}
// Revisar Documentacion Moongose
module.exports = {get}