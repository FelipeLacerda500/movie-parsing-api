import { GetParsedMoviesController } from '../../controllers';
import { makeGetParsedMoviesUseCase } from '../use-cases';

export function makeGetParsedMoviesController() {
  return new GetParsedMoviesController(makeGetParsedMoviesUseCase());
}
