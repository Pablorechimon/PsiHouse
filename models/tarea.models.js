const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = Schema({
    fecha_creacion: { type: Date, default: Date.now },
    fecha_finalizacion: { type: Date, default: null },
    estado: Boolean,
})

module.exports = mongoose.model("tarea", TareaSchema)