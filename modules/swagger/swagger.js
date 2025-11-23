// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Demon Slayer Corps API',
    version: '1.0.0',
    description: 'API for managing users, demons, missions, and reports in the Demon Slayer Corps.',
  },
  servers: [
    {
      url: 'https://dsc-managementsystem.onrender.com',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./modules/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
