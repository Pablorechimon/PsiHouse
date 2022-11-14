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
            message: 'Historias devueltas correctamente',
            data: historia,
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Internal Server Error while finding historias",
            error: err
        });
    });
}

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let historia = new Historias({
            'id_paciente' : req.params.id,
            ...req.body
        });
        historia.save().then(() => {
            res.status(201).json({
                message: "Historia creada correctamente",
                data: historia,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(501).json({ message: "Historia no recibida"})
}

const editHistoria = (req, res) => {
    Historias.findById(req.body._id).then((historia) => {
        Object.assign(historia, req.body);
        historia.save().then(() => {
            res.status(201).json({
                message: "Historia Editada correctamente",
                data: historia
            });
        })
        // .catch((err) => {
        //     return res.status(500).json({
        //         message: "Internal Server error while saving",
        //         error: err
        //     })
        // });
    })
    .catch((err) => {
        return res.status(501).json({
            message: "Falta Historia ID",
            error: err
        })
    })
}
// Revisar Documentacion Moongose
module.exports = {get, create, editHistoria}