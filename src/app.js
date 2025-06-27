const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const customerRoutes = require('./features/customer/customerRoutes');

const app = express();

app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API Documentation',
      version: '1.0.0',
      description: 'API documentation for CRM backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/features/customer/*.js', './src/features/customer/customerController.js'], // Adjusted for new structure
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/customers', customerRoutes);

// Centralized Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;