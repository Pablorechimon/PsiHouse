const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConceptualizacionSchema = Schema({
    id_paciente: String,
    fecha: { type: Date, default: Date.now },
    conceptualizacion: String
})

module.exports = mongoose.model("conceptualizacion", ConceptualizacionSchema)