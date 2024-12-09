const express = require('express');
const router = express.Router();
const Integrante = require('../models/integranteModel');

// Middleware para validar el cuerpo de la solicitud
router.use(express.json());


// Ruta (1) GET => obtener todos los integrantes
router.get('/', async (req, res) => {
    try {
        const integrantes = await Integrante.find();
        res.json(integrantes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los integrantes: ' + err.message });
    }
});

// Ruta (2) GET => obtener un integrante por DNI
router.get('/:dni', async (req, res) => {
    try {
        const integrante = await Integrante.findOne({ dni: req.params.dni });
        if (integrante) {
            res.json(integrante);
        } else {
            res.status(404).json({ mensaje: 'Integrante no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar el integrante: ' + err.message });
    }
});

// Ruta (3) POST => agregar un integrante
router.post('/', async (req, res) => {
    const { nombre, apellido, email, dni } = req.body;

    if (!nombre || !apellido || !email || !dni) {
        return res.status(400).json({ mensaje: 'Faltan datos en el cuerpo de la solicitud' });
    }

    const nuevoIntegrante = new Integrante({nombre, apellido, email, dni });

    try {
        await nuevoIntegrante.save();
        res.status(201).json({mensaje: 'Integrante cargado correctamente', nuevoIntegrante});
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el integrante: ' + err.message });
    }
});

// Ruta (4) PUT => actualizar un email por DNI
router.put('/:dni', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ mensaje: 'Falta el nuevo email' });
    }

    try {
        const integranteActualizado = await Integrante.findOneAndUpdate(
            { dni: req.params.dni },
            { email },
            { new: true }
        );

        if (integranteActualizado) {
            res.json({
                mensaje: 'Email actualizado correctamente',
                integrante: integranteActualizado,
            });
        } else {
            res.status(404).json({ mensaje: 'Integrante no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al modificar el email: ' + err.message });
    }
});

// Ruta (5) DELETE => eliminar un integrante por DNI
router.delete('/:dni', async (req, res) => {
    try {
        const integranteEliminado = await Integrante.findOneAndDelete({ dni: req.params.dni });
        if (integranteEliminado) {
            res.json({
                mensaje: 'Integrante eliminado correctamente',
                integrante: integranteEliminado,
            });
        } else {
            res.status(404).json({ mensaje: 'Integrante no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el integrante: ' + err.message });
    }
});

module.exports = router;
