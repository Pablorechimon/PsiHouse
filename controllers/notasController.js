const Notas = require("../models/notas.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   let id = req.params.id
   Notas.find({
        'id_paciente' : id
   }).then((notas) => {
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
        let nota = new Notas({
            // Ver con Nachito si esto es un approach correcto.
            'id_paciente' : req.params.id,
            ...req.body
        });
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

const editNota = (req, res) => {
    Notas.findById(req.body._id).then((nota) => {
        Object.assign(nota, req.body);
        nota.save().then(() => {
            res.status(200).json({
                message: "Nota updated successfully",
                data: nota
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Internal Server error while saving",
                error: err
            })
        });
    })
    .catch((err) => {
        return res.status(500).json({
            message: "Missing nota id",
            error: err
        })
    })
}

// Revisar Documentacion Moongose
module.exports = {get, create, editNota}