const Compartido = require("../models/compartido.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   Compartido.find().then((compartido) => {
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
// Revisar Documentacion Moongose
module.exports = {get, create}