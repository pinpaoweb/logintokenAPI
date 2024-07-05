const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ mensaje: 'Acceso denegado, no hay token proporcionado' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log(`Token recibido: ${token}`);
    
    const decoded = jwt.verify(token, 'your_jwt_secret');
    console.log(`Token decodificado: ${JSON.stringify(decoded)}`);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error en la autenticación: ${error.message}`);
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
