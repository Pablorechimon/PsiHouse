const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecursoSchema = Schema ({
    nombre: String,
    formato: String,
    fecha: { type: Date, default: Date.now },
})

const CompartidoSchema = Schema({
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    recurso: RecursoSchema,
})

module.exports = mongoose.model("compartido", CompartidoSchema)