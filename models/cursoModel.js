const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: {type: Number, required: true},
    descripcion: { type: String },
    duracion: { type: Number, required: true }, // Duración en horas
    integrantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Integrante' }] // Relación con los integrantes
});

module.exports = mongoose.model('Curso', cursoSchema);
