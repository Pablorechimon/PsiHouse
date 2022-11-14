const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistoriasSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    fecha: { type: Date, default: Date.now },
    historia: {type: String, required: true}
})

module.exports = mongoose.model("historias", HistoriasSchema);