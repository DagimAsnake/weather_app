export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Weather App',
    version: '1.0.0',
    description: 'This is an API documentation',
  },
  servers: [
    {
      url: 'https://weather-app-6igo.onrender.com',
    //   url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Use JWT token in `Authorization` header as `Bearer <token>`',
      },
    },
  },
};
