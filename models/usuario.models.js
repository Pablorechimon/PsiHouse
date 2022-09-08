const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nick: String,
    nobmre: String,
    apellido: String,
    password: String,
    tareas: [{type: Schema.Types.ObjectId, ref: 'tarea'}],
    pacientes: [{type: Schema.Types.ObjectId, ref: 'paciente'}],
})

module.exports = mongoose.model("usuario", UsuarioSchema)