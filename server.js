console.log('hola mundo soy pedro');
const express = require('express');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Asegúrate de que el nombre del archivo es correcto

// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api/auth',  authRoutes);

// Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola mundo: ADSO 2024');
});

// Configurar el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
