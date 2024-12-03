const mongoose = require('mongoose');

const integranteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    dni: String
});

module.exports = mongoose.model('Integrante', integranteSchema);
