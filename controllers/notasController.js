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

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let nota = new Notas(req.body);
        nota.save().then(() => {
            res.status(201).json({
                message: "Nota created successfully",
                data: nota,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Nota not received"})
}
// Revisar Documentacion Moongose
module.exports = {get, create}