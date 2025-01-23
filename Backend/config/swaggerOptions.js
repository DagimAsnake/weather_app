import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinition } from './swaggerConfig.js';

const options = {
  swaggerDefinition,
  apis: ['./swaggerDocs/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
