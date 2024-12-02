const mongoose = require('mongoose');

const integranteSchema = new mongoose.Schema({
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    dni: String
});

module.exports = mongoose.model('Integrante', integranteSchema);
