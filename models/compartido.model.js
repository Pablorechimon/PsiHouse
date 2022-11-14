const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecursoSchema = Schema ({
    nombre: String,
    formato: String,
})

const CompartidoSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    recurso: {type: RecursoSchema, required: true},
    fecha: { type: Date, default: Date.now },
})

module.exports = mongoose.model("compartido", CompartidoSchema)