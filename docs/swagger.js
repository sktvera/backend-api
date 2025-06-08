const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuarios',
    version: '1.0.0',
    description: 'Documentación de API protegida con JWT',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Asegúrate de apuntar bien a tus rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;