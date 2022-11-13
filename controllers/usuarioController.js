const Usuario = require("../models/usuario.model");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const create = async (req, res) => {
    
    if (req.body && Object.keys(req.body).length > 0 && req.body.password && req.body.nombre ){
        let usuario = new Usuario(req.body);
        usuario.password = await usuario.encryptPassword(usuario.password);
        usuario.save().then(() => {
            const token = jwt.sign({id: usuario._id}, process.env.KEY, {
                expiresIn: 60 * 60 * 24
            })
            res.status(201).json({
                message: "User created succesfully",
                data: usuario,
                token: token
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Nickname already in use",
                error: err
            })
        });
    } else return res.status(400).json({message: "Insufficient data to create user"})
}

const login = (req, res) => {
    if (req.body && req.body.nick && req.body.password){
        Usuario.findOne({"nick": req.body.nick}).then(async usuario => {
            let valid = await usuario.validatePassword(req.body.password);
            if (valid){
                const token = jwt.sign({id: usuario._id}, process.env.KEY, {
                    expiresIn: 60 *60 * 24
                })
                res.status(200).json({
                    message: 'Users loged succesfully',
                    data: usuario,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                });
            }
        })
        .catch((err) => 
            res.status(500).json({
                message: "Usuario no existente",
                error: err
            })
        );
    } else return res.status(400).json({ message: "Nickname not recevied"})
}

module.exports = {create, login}