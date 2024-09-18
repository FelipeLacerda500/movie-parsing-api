import { IUseCase } from '@/shared/protocols';
import { UnparsedMovieDTO, ParsedMovieDTO } from '../dtos';
import { MovieParsingHelper } from '../helpers';

type UseCaseRequest = UnparsedMovieDTO[];

type UseCaseResponse = ParsedMovieDTO[];

export class GetParsedMoviesUseCase
  implements IUseCase<UseCaseRequest, UseCaseResponse>
{
  public execute(data: UseCaseRequest): UseCaseResponse {
    const parsedMoviesList = data.map((movie) => {
      const basicInfo = {
        titulo: movie.titulo,
        ano: movie.ano,
        diretor: movie.diretor,
        genero: movie.genero,
      };

      const durationInSeconds = MovieParsingHelper.convertDurationToSeconds(
        movie.duracao,
      );

      const imdbRating = MovieParsingHelper.getIMDbRating(movie.ratings);

      const profit = MovieParsingHelper.calculateProfit(
        movie.orcamento,
        movie.bilheteria,
      );

      const mostRelevantAward = MovieParsingHelper.getMostRelevantAward(
        movie.premios,
      );

      const synopsis = MovieParsingHelper.getSynopsis(movie.sinopse);

      return {
        ...basicInfo,
        duracaoSegundos: durationInSeconds,
        notaIMDb: imdbRating,
        lucro: profit,
        maiorPremiacao: mostRelevantAward,
        sinopse: synopsis,
      };
    });

    return parsedMoviesList;
  }
}
