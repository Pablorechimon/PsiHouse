const { json } = require("body-parser")
const Pagos = require("../models/pagos.model")
const mongoose = require('mongoose');

const get = async (req, res) => {
    /*
    Ver tema de Swager
    */
    let id_usuario = req.params.id
    const query = Pagos.find({
     "id_usuario" : id_usuario
     });
     const queryResponse = await query.exec();
     let ids = mongoose.Types.ObjectId(id_usuario)
    if(queryResponse){
        Pagos.aggregate([
            {
                $match: {
                    'id_usuario': ids
                }
            },
            {
                $group:{
                    _id:{id_paciente:"$id_paciente"}, 
                    deuda: {$sum: { $subtract: ["$precio_consulta", "$monto_abonado"]}},
                }
            }
        ])
        .then(data => {
            res.status(200).json({
                message: "Pagos devueltos correctamente",
                data: data
            })
        })
        // .catch((err) => {
        //         res.status(500).json({
        //             message: "Internal Server Error while finding pagos",
        //             error: err
        //     })
        // })
    }
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
        message: 'Pagos devueltos successfully',
        data: notas,
    });
   })
//    .catch((err) => {
//     res.status(500).json({
//         message: "Internal Server Error while finding Pagos",
//         error: err
//     });
//    });
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
                message: "Pago creado correctamente",
                data: pago,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Datos de formulario incorrectos",
                error: err
            })
        })
    } else return res.status(400).json({ message: "Pago no recibido"})
}

const editPago = (req, res) => {
    Pagos.findById(req.body._id).then((pago) => {
        Object.assign(pago, req.body);
        pago.save().then(() => {
            res.status(200).json({
                message: "Pago editado correctamente",
                data: pago
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
        return res.status(500).json({
            message: "Falta Pago ID",
            error: err
        })
    })
}

// Revisar Documentacion Moongose
module.exports = {get, create, editPago, getPagosPaciente}
