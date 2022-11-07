const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PagosSchema = Schema({
    id_usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    id_paciente: {type: Schema.Types.ObjectId, ref: 'pacientes'},
    fecha: { type: Date, default: Date.now },
    precio_consulta: Number,
    monto_abonado: { type: Number, default: 0 }
})

module.exports = mongoose.model("pagos", PagosSchema)