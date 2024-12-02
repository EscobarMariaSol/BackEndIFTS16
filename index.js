const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

//Middleware para analizar JSON
app.use(express.json());

const Integrante = require('./models/integranteModel'); // Importa el modelo de Mongoose

// Rutas
///GET: 1. Ruta principal

app.get('/', (req, res) => {
    res.status(200).json({
        message: '¡Bienvenido a la API! Todo está funcionando correctamente.'
    });
});


///GET: 2. Ruta para obtener los integrantes

app.get('/integrantes', async (req, res) => {
    try {
        // Buscar todos los integrantes en la colección
        const integrantes = await Integrante.find();
        res.json(integrantes);
    } catch (err) {
        // Manejar errores
        res.status(500).json({ error: 'Error al obtener los integrantes: ' + err.message });
    }
});

///GET: 3. Ruta para obtener un integrante por su DNI => GET /integrantes/:dni

app.get('/integrantes/:dni', async (req, res) => {
    try {
        const integrante = await Integrante.findOne({ dni: parseInt(req.params.dni) });
        if (!integrante) {
            return res.status(404).json({ message: 'Integrante no encontrado' });
        }
        res.status(200).json(integrante);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar integrante', error: error.message });
    }
});

// POST: 4.  Ruta para agregar un nuevo integrante

app.post('/integrantes/agregar', async (req, res) => {
    try {
        const nuevoIntegrante = new Integrante(req.body);
        await nuevoIntegrante.save();
        res.status(201).json({ message: 'Integrante agregado con éxito', data: nuevoIntegrante });
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar integrante', error: error.message });
    }
});


// PUT: 5. Modificar el mail de un integrante buscandolo por DNI

app.put('/integrantes/:dni', async (req, res) => {
    const { email } = req.body; // Extraer el nuevo email del cuerpo de la solicitud
    const { dni } = req.params; // Obtener el DNI de los parámetros de la URL

    // Validar que el nuevo email esté presente en el cuerpo de la solicitud
    if (!email) {
        return res.status(400).json({ mensaje: 'Falta el nuevo email' });
    }

    try {
        // Buscar y actualizar el correo electrónico del integrante según el DNI
        const integranteActualizado = await Integrante.findOneAndUpdate(
            { dni }, // Filtro: buscar por DNI
            { email }, // Actualización: establecer el nuevo email
            { new: true } // Devuelve el documento actualizado
        );

        // Si el integrante no existe, devolver un error 404
        if (!integranteActualizado) {
            return res.status(404).json({ mensaje: 'Integrante no encontrado con ese DNI' });
        }

        // Respuesta exitosa con los datos actualizados del integrante
        res.json({
            mensaje: 'Email actualizado correctamente',
            integrante: integranteActualizado
        });
    } catch (err) {
        // Manejar errores del servidor
        res.status(500).json({ error: 'Error al actualizar el email: ' + err.message });
    }
});

// DELETE: 6. Ruta para eliminar un integrante por DNI
app.delete('/integrantes/:dni', async (req, res) => {
    try {
        const integranteEliminado = await Integrante.findOneAndDelete({ dni: req.params.dni });

        if (integranteEliminado) {
            const integrantes = await Integrante.find();
            res.json(integrantes);
        } else {
            res.status(404).json({ mensaje: 'No se encontró el integrante con el DNI especificado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
