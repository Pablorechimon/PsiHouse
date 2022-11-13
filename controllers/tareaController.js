const Tarea = require("../models/tarea.model")

const get = async (req, res) => {
    /*
    Ver tema de Swager
    */
    let id_usuario = req.params.id
        Tarea.find({
            "id_usuario" : id_usuario
            }).then((tarea) => {
            return res.status(200).json({
                message: 'Tarea devuelta correctamente',
                data: tarea
            });
           })
           .catch((err) => {
            return res.status(500).json({
                message: "Usuario no existente",
                error: err
            });
        });
}


const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let tarea = new Tarea(req.body);
        tarea.save().then(() => {
            res.status(201).json({
                message: "Tarea creada correctamente",
                data: tarea,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(501).json({ message: "Tarea no recibida"})
}

const editTask = (req, res) => {
    Tarea.findById(req.body._id).then((tarea) => {
        Object.assign(tarea, req.body);
        tarea.save().then(() => {
            res.status(201).json({
                message: "Tarea Editada correctamente",
                data: tarea
            });
        })
    })
    .catch((err) => {
        return res.status(501).json({
            message: "La tarea no existe",
            error: err
        })
    })
}
// Revisar Documentacion Moongose
module.exports = {get, create, editTask}