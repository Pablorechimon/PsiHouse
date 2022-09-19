const Compartido = require("../models/compartido.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
    let id = req.params.id
    Compartido.find({
        'id_paciente' : id
    }).then((compartido) => {
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

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let compartido = new Compartido(req.body);
        compartido.save().then(() => {
            res.status(201).json({
                message: "Compartido created successfully",
                data: compartido,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Compartido not received"})
}

const editCompartido = (req, res) => {
    Compartido.findById(req.body._id).then((compartido) => {
        Object.assign(compartido, req.body);
        compartido.save().then(() => {
            res.status(200).json({
                message: "Compartido updated successfully",
                data: compartido
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
            message: "Internal Server error while saving",
            error: err
        })
    })
}
// Revisar Documentacion Moongose
module.exports = {get, create, editCompartido}