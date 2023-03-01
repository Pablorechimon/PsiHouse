const { query } = require("express");
const Paciente = require("../models/paciente.model")

const get = async (req, res) => {
    /*
    Ver tema de Swager
    */
    let id_usuario = req.params.id

    Paciente.find({
        "id_usuario": id_usuario
    }).then((pacientes) => {
        res.status(200).json({
            message: 'Pacientes devueltos correctamente',
            data: pacientes,
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Internal Server Error while finding pacientes",
            error: err
        });
    });
}

const getPaciente = (req, res) => {
    let id = req.params.id
    Paciente.findById(id).then((paciente) => {
        res.status(200).json({
            message: 'Paciente ' + id + ' devuelto correctamente',
            data: paciente
        });
    })
        .catch(err => {
            res.status(500).json({
                message: "Internal server error while finding paciente",
                error: err
            });
        });
}

const create = async (req, res) => {
    const query = Paciente.findOne({
        "DNI": req.body.DNI
    });
    const queryResponse = await query.exec();
    if (!queryResponse) {
        if (req.body && Object.keys(req.body).length > 0) {
            let paciente = new Paciente(req.body);
            res.status(200)
            paciente.save().then(() => {
                res.status(201).json({
                    message: "Paciente creado correctamente",
                    data: paciente,
                });
            })
                .catch((err) => {
                    res.status(500).json({
                        message: "Error while creating paciente",
                        error: err
                    })
                })
        } else return res.status(501).json({ message: "Paciente no recibido" })
    } else return res.status(502).json({ message: "Paciente ya existe" })

}


const editPaciente = (req, res) => {
    id = req.params.id
    if (req.body.tratamiento_finalizado == 'on'){
        req.body.tratamiento_finalizado = true
    } else if (!req.body.tratamiento_finalizado){
        req.body.tratamiento_finalizado = false
    }
    if (req.body.riesgo_suicida == 'on'){
        req.body.riesgo_suicida = true
    } else if (!req.body.riesgo_suicida){
        req.body.riesgo_suicida = false
    }
    Paciente.findById(id).then((paciente) => {
        Object.assign(paciente, req.body);
        paciente.save().then(() => {
            res.status(201).json({
                message: "Paciente Editado correctamente",
                data: paciente
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
            return res.status(501).json({
                message: "Falta Paciente ID",
                error: err
            })
        })
}

// Revisar Documentacion Moongose
module.exports = { get, getPaciente, create, editPaciente }
