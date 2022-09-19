const Historia = require("../models/historia.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Historia.find().then((historia) => {
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
        let historia = new Historia(req.body);
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
    } else return res.status(400).json({ message: "Paciente not received"})
}
// Revisar Documentacion Moongose
module.exports = {get, create}