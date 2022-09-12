const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecursoSchema = Schema ({
    nombre: String,
    formato: String,
    fecha: { type: Date, default: Date.now },
})

const CompartidoSchema = Schema({
    id_compartido: String,
    id_paciente: String,
    recurso: [RecursoSchema],
})

module.exports = mongoose.model("compartido", CompartidoSchema)