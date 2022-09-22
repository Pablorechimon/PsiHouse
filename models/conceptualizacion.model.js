const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConceptualizacionSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    fecha: { type: Date, default: Date.now },
    conceptualizacion: String
})

module.exports = mongoose.model("conceptualizaciones", ConceptualizacionSchema)