import fastify from 'fastify';
import cors from '@fastify/cors';
import { PersonRoute } from './routes/PersonRoute';
import * as dotenv from 'dotenv';

// Carregar o arquivo .env
dotenv.config();


const app = fastify({ logger: true });
const PORT = parseInt(`${process.env.PORT || 3131}`);

app.register(cors);

const rotas = [PersonRoute];


rotas.forEach(routes => {
  app.register(routes);
});

const start = async () => {
  try {
    console.log('Database URL:', process.env.DATABASE_URL);
    await app.listen({ port: PORT });
    
  } catch (error) {
    console.error('Ocorreu um erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

start();
