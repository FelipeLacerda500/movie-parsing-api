/* eslint-disable require-await */

import { FastifyInstance } from 'fastify';
import { makeGetParsedMoviesController } from '@/modules/movie/factories/controllers';
import { fastifyRouteAdapter } from '../adapters';

export async function appRoutes(app: FastifyInstance) {
  app.get('/filmes', fastifyRouteAdapter(makeGetParsedMoviesController()));
}
