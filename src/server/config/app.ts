import { appRoutes } from '../routes';
import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { ValidationError } from '@/shared/errors';
import helmet from '@fastify/helmet';

export const app = fastify();

app.register(cors);
app.register(helmet, { global: true });
app.register(appRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ValidationError) {
    return reply.status(400).send({
      message: error.message,
      params: error.getParams(),
    });
  }

  return reply.status(500).send({ message: `Internal server error.` });
});
