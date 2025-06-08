const express = require('express');
const router = express.Router();

// Rutas individuales
const usersRouter = require('./users');
const authRouter = require('./auth'); // si tienes auth
// const otherRouter = require('./other'); // más routers si lo necesitas

const routes = [
  { path: '/api/users', handler: usersRouter },
  { path: '/api/auth', handler: authRouter },
  // { path: '/api/other', handler: otherRouter },
];

// ✅ Monta todas las rutas
routes.forEach(({ path, handler }) => {
  if (typeof handler === 'function') {
    router.use(path, handler);
  } else {
    console.warn(`⚠️ La ruta "${path}" no exporta un router válido.`);
  }
});

module.exports = router;