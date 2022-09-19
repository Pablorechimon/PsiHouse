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

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let conceptualizacion = new Conceptualizacion(req.body);
        conceptualizacion.save().then(() => {
            res.status(201).json({
                message: "Conceptualizacion created successfully",
                data: conceptualizacion,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Paciente not received"})
}
// Revisar Documentacion Moongose
module.exports = {get}