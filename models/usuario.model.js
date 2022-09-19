const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nick: String,
    nombre: String,
    apellido: String,
    password: String,
    tareas: [{type: Schema.Types.ObjectId, ref: 'tarea'}],
    pacientes: [{type: Schema.Types.ObjectId, ref: 'paciente'}],
})

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

UsuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("usuario", UsuarioSchema)