const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = Schema({
    id_usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    descripcion: {type: String, required: true},
    fecha_creacion: { type: Date, default: Date.now },
    fecha_finalizacion: { type: Date, default: null },
    finalizado: {type: Boolean, default: false},
})

module.exports = mongoose.model("tareas", TareaSchema)