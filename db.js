const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://SolEscobar:Password@clusterbackend.juuys.mongodb.net/BackendDB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conexión exitosa con MongoDB Atlas'))
    .catch(err => {
        console.error('Error al conectar con MongoDB Atlas:', err.message);
    });

module.exports = mongoose;
