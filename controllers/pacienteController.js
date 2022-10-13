const { query } = require("express");
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

const getPaciente = (req, res) => {
    let id = req.params.id
        Paciente.findById(id).then((paciente) => {
            res.status(200).json({
                message: 'Paciente ' + id + ' retreived successfully',
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

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let paciente = new Paciente(req.body);
        paciente.save().then(() => {
            res.status(201).json({
                message: "Paciente created successfully",
                data: paciente,
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

const editPaciente = (req, res) => {
    id = req.params.id
    Paciente.findById(id).then((paciente) => {
        Object.assign(paciente, req.body);
        paciente.save().then(() => {
            res.status(200).json({
                message: "Paciente updated successfully",
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
        return res.status(500).json({
            message: "Missing Paciente id",
            error: err
        })
    })
}

// Revisar Documentacion Moongose
module.exports = {get, getPaciente,  create, editPaciente}