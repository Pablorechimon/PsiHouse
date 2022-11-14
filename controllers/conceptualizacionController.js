const Conceptualizacion = require("../models/conceptualizacion.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
    let id = req.params.id
    Conceptualizacion.find({
        'id_paciente' : id
   }).then((conceptualizacion) => {
    res.status(200).json({
        message: 'Conceptualizaciones devueltas correctamente',
        data: conceptualizacion,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding conceptualizaciones",
        error: err
    });
   });
}

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let conceptualizacion = new Conceptualizacion({
            'id_paciente' : req.params.id,
            ...req.body
        });
        conceptualizacion.save().then(() => {
            res.status(201).json({
                message: "Conceptualizacion creada correctamente",
                data: conceptualizacion,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(501).json({ message: "Conceptualizacion no recibida"})
}

const editConceptualizacion = (req, res) => {
    Conceptualizacion.findById(req.body._id).then((conceptualizacion) => {
        Object.assign(conceptualizacion, req.body);
        conceptualizacion.save().then(() => {
            res.status(201).json({
                message: "Conceptualizacion Editada correctamente",
                data: conceptualizacion
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
            message: "Falta Conceptualizacion ID",
            error: err
        })
    })
}
// Revisar Documentacion Moongose
module.exports = {get, create, editConceptualizacion}