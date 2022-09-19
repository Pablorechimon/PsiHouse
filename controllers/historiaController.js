const Historias = require("../models/historia.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
    let id = req.params.id
    Historias.find({
    'id_paciente' : id
    }).then((historia) => {
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

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let historia = new Historias({
            'id_paciente' : req.params.id,
            'historia': req.body.historia
        });
        historia.save().then(() => {
            res.status(201).json({
                message: "Historia created successfully",
                data: historia,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Historia not received"})
}

const editHistoria = (req, res) => {
    Historias.findById(req.body._id).then((historia) => {
        Object.assign(historia, req.body);
        historia.save().then(() => {
            res.status(200).json({
                message: "Historia updated successfully",
                data: historia
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
module.exports = {get, create, editHistoria}