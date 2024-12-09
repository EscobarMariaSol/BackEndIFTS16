const express = require('express');
const mongoose = require('mongoose');

const integrantesRoutes = require('./routes/integrantes');
const cursosRoutes = require('./routes/cursos');

const app = express();
const PORT = 3000;

// Middleware global para registrar solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Continúa hacia la siguiente ruta o middleware
});

//Parseo JSON
app.use(express.json()); 

// Prefijo para las rutas de integrantes
app.use('/integrantes', integrantesRoutes); 

// Prefijo para las rutas de los cursos
app.use('/cursos', cursosRoutes);


// Conectar a MongoDB Atlas
const MONGO_URI = 'mongodb+srv://SolEscobar:Password@clusterbackend.juuys.mongodb.net/BackendDB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Mi API está funcionando correctamente!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
