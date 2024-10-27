import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export async function setupSwagger(fastify: FastifyInstance) {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Api Hero Backend',
        description: 'Testar no Postman ou Insomnia passando os parâmetros do (schemas) para cada rota',
        version: '1.0.0',
      },
      components: {
        schemas: {
            getPerson: {
            // type: 'object',
            // properties: {
            // },
          },
          CreatePersonRequest: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              level: { type: 'number' },
              type: { type: 'string' },
              element: { type: 'string' },
              boss: { type: 'boolean' },
            },
            required: ['name', 'level','type','element','boss']
          },
          DeletePersonRequest: {
            type: 'object',
            properties: {
                id: { type: "number" },
            },
            required: ['id']
          },
          UpdatePersonRequest: {
            type: 'object',
            properties: {
              id: { type: "number" },
              name: { type: 'string' },
              level: { type: 'number' },
              type: { type: 'string' },
              element: { type: 'string' },
              boss: { type: 'boolean' },
            },
            required: ['name', 'level','type','element','boss','id']
          },
        },
      },
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });
}