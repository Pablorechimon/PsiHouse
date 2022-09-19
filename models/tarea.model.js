const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = Schema({
    descripcion: String,
    fecha_creacion: { type: Date, default: Date.now },
    fecha_finalizacion: { type: Date, default: null },
    finalizado: {type: Boolean, default: false},
})

module.exports = mongoose.model("tarea", TareaSchema)