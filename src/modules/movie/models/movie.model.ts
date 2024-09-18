import { Award, Rating, Synopsis } from './movie-attributes.model';

export type Movie = {
  titulo: string;
  diretor: string;
  ano: number;
  genero: string[];
  duracao: number;
  ratings: Rating[];
  elenco: string[];
  sinopse: Synopsis[];
  poster: string;
  trailer: string;
  locacoes: string[];
  orcamento: string;
  bilheteria: string;
  premios: Award[];
};
