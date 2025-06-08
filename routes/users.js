const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

// Proteger todas las rutas
router.use(authMiddleware);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               estado: { type: string, enum: [activo, inactivo] }
 *               profesion: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/', async (req, res) => {
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  const { password: _, ...safeUser } = user.toJSON();
  res.status(201).json(safeUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               estado: { type: string, enum: [activo, inactivo] }
 *               profesion: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const { password, ...data } = req.body;
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  await user.update(data);
  const { password: _, ...safeUser } = user.toJSON();
  res.json(safeUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  await user.destroy();
  res.status(204).send();
});

/**
 * @swagger
 * /api/users/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/:id/estado', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  user.estado = req.body.estado;
  await user.save();
  const { password, ...safeUser } = user.toJSON();
  res.json(safeUser);
});

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cerrar sesión (logout simulado)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada
 */
router.post('/logout', (req, res) => {
  // En JWT, cerrar sesión es cosa del cliente (elimina el token)
  res.json({ message: 'Sesión cerrada (cliente debe eliminar el token)' });
});

module.exports = router;