const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotasSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    fecha: { type: Date, default: Date.now },
    nota: {type: String, required: true }
})

module.exports = mongoose.model("notas", NotasSchema)