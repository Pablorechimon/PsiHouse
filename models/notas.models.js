const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotasSchema = Schema({
    id_paciente: String,
    fecha: { type: Date, default: Date.now },
    nota: String
})

module.exports = mongoose.model("notas", NotasSchema)