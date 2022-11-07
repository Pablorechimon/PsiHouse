const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nick: {type: String, unique: true},
    nombre: String,
    apellido: String,
    password: String,
})

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

UsuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("usuarios", UsuarioSchema)