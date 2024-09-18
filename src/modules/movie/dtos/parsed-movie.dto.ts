import { Movie } from '../models';

export type ParsedMovieDTO = Pick<
  Movie,
  'titulo' | 'ano' | 'diretor' | 'genero'
> & {
  duracaoSegundos: number;
  notaIMDb: number;
  lucro: string;
  maiorPremiacao: string;
  sinopse: string;
};
