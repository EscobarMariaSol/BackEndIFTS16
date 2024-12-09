const express = require('express');
const router = express.Router();

const Curso = require('../models/cursoModel');
const Integrante = require('../models/integranteModel');

// Ruta (6) => POST: Crear un curso
router.post('/', async (req, res) => {
    const { nombre, descripcion, duracion } = req.body;

    try {
        const nuevoCurso = new Curso({ nombre, descripcion, duracion });
        const cursoGuardado = await nuevoCurso.save();
        res.status(201).json(cursoGuardado);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el curso', error: err.message });
    }
});

// Ruta (7) => GET: Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('integrantes', 'nombre apellido email');
        res.status(200).json(cursos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: err.message });
    }
});

// Ruta (8) => PUT: Asignar un integrante a un curso
router.put('/asignar', async (req, res) => {
    const { nombreCurso, dniIntegrante } = req.body;

    try {
        // Buscar el curso por su nombre
        const curso = await Curso.findOne({ nombre: nombreCurso });
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        // Buscar el integrante por su DNI
        const integrante = await Integrante.findOne({ dni: dniIntegrante });
        if (!integrante) return res.status(404).json({ message: 'Integrante no encontrado' });

        // Verificar si el integrante ya está asignado al curso
        if (curso.integrantes.includes(integrante._id)) {
            return res.status(400).json({ message: 'El integrante ya está asignado a este curso' });
        }

        // Agregar el integrante al curso
        curso.integrantes.push(integrante._id);
        await curso.save();

        res.status(200).json({
            message: 'Integrante asignado al curso con éxito',
            curso
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al asignar integrante', error: err.message });
    }
});
;

// Ruta (9) => DELETE: Eliminar un curso
router.delete('/:id', async (req, res) => {
    try {
        const cursoEliminado = await Curso.findByIdAndDelete(req.params.id);
        if (!cursoEliminado) return res.status(404).json({ message: 'Curso no encontrado' });

        res.status(200).json({ message: 'Curso eliminado', cursoEliminado });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el curso', error: err.message });
    }
});

module.exports = router;
