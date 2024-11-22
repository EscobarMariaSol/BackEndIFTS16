const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(express.json());

// Funciones Auxiliares

function respuestaOk(res, msg) {
    return res.status(200).json(msg);   
}

// Rutas
///GET: 1. Ruta principal
app.get('/', (req, res) => {
    respuestaOk(res, {message: '¡Bienvenido a mi primer API! Todo está funcionando correctamente.'});
});


///GET: 2. Ruta para obtener los integrantes
app.get('/integrantes', (req, res) => {
    fs.readFile('integrantes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        respuestaOk(res, JSON.parse(data));
    });
});

///GET: 3. Ruta para obtener un integrante por su DNI => GET /integrantes/:id
app.get('/integrantes/:dni', (req, res) => {
    const { dni } = req.params; // Extraer el DNI de los parámetros de la URL

    // Leer el archivo JSON
    fs.readFile('integrantes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        // Parsear los datos del archivo
        const integrantes = JSON.parse(data);

        // Buscar el integrante con el DNI proporcionado
        const integrante = integrantes.find(integrante => integrante.dni === parseInt(dni));

        if (!integrante) {
            return res.status(404).json({ message: `Integrante con DNI ${dni} no encontrado` });
        }

        // Devolver los datos del integrante
        respuestaOk(res, {
            nombre: integrante.nombre,
            apellido: integrante.apellido,
            mail: integrante.mail
        });
    });
});

// POST: Ruta para agregar un nuevo integrante
app.post('/integrantes/agregar', (req, res) => {
    const nuevoIntegrante = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!nuevoIntegrante.dni || !nuevoIntegrante.nombre || !nuevoIntegrante.apellido || !nuevoIntegrante.mail) {
        return res.status(400).json({ 
            message: 'Faltan datos. Asegúrate de incluir dni, nombre, apellido y mail.' 
        });
    }

    // Leer el archivo JSON
    fs.readFile('integrantes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        // Parsear los datos existentes
        const integrantes = JSON.parse(data);

        // Verificar si el ID ya existe
        const dniExiste = integrantes.some(integrante => integrante.dni === nuevoIntegrante.dni);
        if (dniExiste) {
            return res.status(400).json({ message: `El DNI ${nuevoIntegrante.dni} ya está en uso. Usa un DNI único.` });
        }

        // Agregar el nuevo integrante a la lista
        integrantes.push(nuevoIntegrante);

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFile('integrantes.json', JSON.stringify(integrantes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al escribir en el archivo' });
            }

            // Devolver la lista completa de integrantes
            respuestaOk(res, {
                message: 'Integrante agregado con éxito.',
                data: integrantes
            });
        });
    });
});


// PUT: Ruta para actualizar el apellido de un integrante por su mail
app.put('/integrantes/:mail', (req, res) => {
    const { mail } = req.params; // Extraer el mail de los parámetros de la URL
    const { apellido } = req.body; // Extraer el nuevo apellido del cuerpo de la solicitud

    // Validar que el apellido está presente en la solicitud
    if (!apellido) {
        return res.status(400).json({ message: 'Falta el campo apellido en el cuerpo de la solicitud.' });
    }

    // Leer el archivo JSON
    fs.readFile('integrantes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        // Parsear los datos existentes
        const integrantes = JSON.parse(data);

        // Buscar el integrante por mail
        const integranteIndex = integrantes.findIndex(integrante => integrante.mail === mail);

        if (integranteIndex === -1) {
            return res.status(404).json({ message: `No se encontró un integrante con el mail ${mail}` });
        }

        // Actualizar el apellido del integrante encontrado
        integrantes[integranteIndex].apellido = apellido;

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFile('integrantes.json', JSON.stringify(integrantes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al escribir en el archivo' });
            }

            // Devolver el integrante actualizado
            respuestaOk(res, {
                message: 'Apellido actualizado con éxito.',
                data: integrantes[integranteIndex]
            });
        });
    });
});


// DELETE: Ruta para eliminar un integrante por DNI
app.delete('/integrantes/:dni', (req, res) => {
    const { dni } = req.params; // Extraer el DNI de los parámetros de la URL

    // Leer el archivo JSON
    fs.readFile('integrantes.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        // Parsear los datos existentes
        const integrantes = JSON.parse(data);

        // Buscar el índice del integrante por DNI
        const integranteIndex = integrantes.findIndex(integrante => integrante.dni === parseInt(dni));

        if (integranteIndex === -1) {
            return res.status(404).json({ message: `No se encontró un integrante con el DNI ${dni}` });
        }

        // Eliminar el integrante del array
        const integranteEliminado = integrantes.splice(integranteIndex, 1);

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFile('integrantes.json', JSON.stringify(integrantes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al escribir en el archivo' });
            }

            // Devolver la lista completa de integrantes actualizada
            respuestaOk(res, {
                message: `El integrante con DNI ${dni} ha sido eliminado.`,
                data: integrantes
            });
        });
    });
});

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
