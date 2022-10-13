const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistoriasSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    fecha: { type: Date, default: Date.now },
    historia: String
})

module.exports = mongoose.model("historias", HistoriasSchema);