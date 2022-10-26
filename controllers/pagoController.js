const { json } = require("body-parser")
const Pagos = require("../models/pagos.model")

const get = (req, res) => {
    /*
    Ver tema de Swager
    */
   // Entregar un listado de deduda por paciente
    Pagos.aggregate([
        {
            $group:{
                _id:{id_paciente:"$id_paciente"}, 
                deuda: {$sum: { $subtract: ["$precio_consulta", "$monto_abonado"]}},
            }
        }
    ])
    .then(data => {
        res.status(200).json({
            message: "Pagos retrieved successfully",
            data: data
        })
    })
    .catch((err) => {
            res.status(500).json({
                message: "Internal Server Error while finding pagos",
                error: err
        })
    })
}

const getPagosPaciente = (req, res) => {
    /*
    Ver tema de Swager
    */
   let id = req.params.id
   Pagos.find({
        'id_paciente' : id
   }).then((notas) => {
    res.status(200).json({
        message: 'Pagos retrieved successfully',
        data: notas,
    });
   }).catch((err) => {
    res.status(500).json({
        message: "Internal Server Error while finding Pagos",
        error: err
    });
   });
}

const create = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0){
        let pago = new Pagos({
            // Ver con Nachito si esto es un approach correcto.
            'id_paciente' : req.params.id,
            ...req.body
        });
        pago.save().then(() => {
            res.status(201).json({
                message: "Pago created successfully",
                data: pago,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error while saving",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Pago not received"})
}

const editPago = (req, res) => {
    Pagos.findById(req.body._id).then((pago) => {
        Object.assign(pago, req.body);
        pago.save().then(() => {
            res.status(200).json({
                message: "Pago updated successfully",
                data: pago
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
            message: "Missing pago id",
            error: err
        })
    })
}

// Revisar Documentacion Moongose
module.exports = {get, create, editPago, getPagosPaciente}
