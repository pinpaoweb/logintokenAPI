const express = require('express');
const { register, login, updateUser } = require('../controllers/authController'); // Asegúrate de importar updateUser
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para el registro
router.post('/register', register);

// Ruta para el login (POST)
router.post('/login', login);

// Ruta protegida de ejemplo
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ mensaje: 'Accediste a una ruta protegida', user: req.user });
});

// Ruta protegida para actualizar datos del usuario
router.put('/update', authMiddleware, updateUser);

module.exports = router;
