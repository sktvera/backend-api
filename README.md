# ⚙️ Backend API - Node.js + Express + MySQL + Sequelize + JWT + Swagger

Este proyecto es un ejemplo educativo de cómo construir una API RESTful profesional utilizando Node.js y Express, con conexión a una base de datos MySQL usando Sequelize como ORM. Incluye autenticación con JWT, documentación con Swagger y middleware para control de acceso.

---

## 🚀 Características

- 🔌 **Express.js** como framework web.
- 🛢️ **pg** como sistema gestor de base de datos.
- 🧠 **Sequelize** como ORM para modelado de datos.
- 🔐 **JWT (JSON Web Tokens)** para autenticación.
- 🛡️ **Middleware** de autorización.
- 📚 **Swagger** para documentación automática.
- 🧪 Estructura lista para testeo y escalabilidad.

---

## 📁 Estructura del Proyecto

```bash
.
├── app.js                      # Archivo principal de la aplicación
├── bin/www                    # Punto de entrada del servidor
├── config/                    # Configuraciones de Sequelize
│   └── config.js/.json
├── docs/                      # Configuración de Swagger
│   └── swagger.js
├── middlewares/              # Middlewares personalizados (ej. JWT auth)
│   └── auth.middleware.js
├── migrations/                # Migraciones de Sequelize
├── models/                    # Modelos de base de datos
│   └── user.model.js
├── public/                    # Archivos estáticos
├── routes/                    # Rutas de la API
│   └── index.js / users.js
├── seeders/                   # Datos iniciales
└── README.md                  # Este archivo


npm start

tree -I 'node_modules'