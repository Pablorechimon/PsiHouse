const Tarea = require("../models/tarea.model")

const get = async (req, res) => {
    /*
    Ver tema de Swager
    */
   Tarea.find().then((tarea) => {
    return res.status(200).json({
        message: 'Tarea retrieved successfully',
        data: tarea
    });
   })
   .catch((err) => {
    console.log("Entre por error")
    return res.status(500).json({
        message: "Internal Server Error while finding tarea",
        error: err
    });
   });
}

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let tarea = new Tarea(req.body);
        tarea.save().then(() => {
            res.status(201).json({
                message: "Tarea created successfully",
                data: tarea,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Tarea not received"})
}

const editTask = (req, res) => {
    Tarea.findById(req.body._id).then((tarea) => {
        Object.assign(tarea, req.body);
        tarea.save().then(() => {
            res.status(200).json({
                message: "Tarea updated successfully",
                data: tarea
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
module.exports = {get, create, editTask}