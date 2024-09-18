import { Movie } from '../models';

export type UnparsedMovieDTO = Omit<
  Movie,
  'elenco' | 'poster' | 'trailer' | 'locacoes'
>;
