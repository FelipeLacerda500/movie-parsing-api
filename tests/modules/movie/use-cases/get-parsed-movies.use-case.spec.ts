/* eslint-disable init-declarations */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetParsedMoviesUseCase } from '@/modules/movie/use-cases';
import { MovieParsingHelper } from '@/modules/movie/helpers';
import { faker } from '@faker-js/faker';
import { UnparsedMovieDTO, ParsedMovieDTO } from '@/modules/movie/dtos';
import { Award, Synopsis } from '@/modules/movie/models';

describe('GetParsedMoviesUseCase', () => {
  let durationTimeInMinutes: number;
  let imdbRatingValue: number;
  let budget: string;
  let boxOffice: string;
  let formattedProfit: string;
  let mostRelevantAward: Award;
  let award: Award[];
  let ptbrSynopsis: Synopsis;
  let synopses: Synopsis[];

  beforeEach(() => {
    durationTimeInMinutes = faker.number.int({ min: 1, max: 180 });
    imdbRatingValue = faker.number.float({ min: 0, max: 10 });
    budget = `$${faker.number.float({ min: 1, max: 999, fractionDigits: 2 })} milhões`;
    boxOffice = `$${faker.number.float({ min: 1, max: 999, fractionDigits: 2 })} milhões`;
    formattedProfit = `$${faker.number.float({ min: 1, max: 999, fractionDigits: 2 })} milhões`;
    mostRelevantAward = {
      nome: faker.word.noun(),
      relevancia: faker.number.int({ min: 10, max: 10 }),
    };
    award = [
      { ...mostRelevantAward },
      {
        nome: faker.word.noun(),
        relevancia: faker.number.int({ min: 0, max: 9 }),
      },
      {
        nome: faker.word.noun(),
        relevancia: faker.number.int({ min: 0, max: 9 }),
      },
    ];
    ptbrSynopsis = {
      idioma: 'pt-br',
      texto: faker.lorem.sentences(2),
    };
    synopses = [
      {
        ...ptbrSynopsis,
      },
      {
        idioma: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
        texto: faker.lorem.sentences(2),
      },
    ];

    vi.spyOn(MovieParsingHelper, 'convertDurationToSeconds').mockReturnValue(
      durationTimeInMinutes * 60,
    );
    vi.spyOn(MovieParsingHelper, 'getIMDbRating').mockReturnValue(
      imdbRatingValue,
    );
    vi.spyOn(MovieParsingHelper, 'calculateProfit').mockReturnValue(
      formattedProfit,
    );
    vi.spyOn(MovieParsingHelper, 'getMostRelevantAward').mockReturnValue(
      award[0].nome,
    );
    vi.spyOn(MovieParsingHelper, 'getSynopsis').mockReturnValue(
      synopses[0].texto,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should parse a list of unparsed movies correctly', () => {
    const unparsedMovies: UnparsedMovieDTO[] = [
      {
        titulo: faker.lorem.words(3),
        diretor: faker.name.fullName(),
        ano: faker.date.past().getFullYear(),
        genero: ['Action', 'Drama', 'Comedy'],
        duracao: durationTimeInMinutes,
        ratings: [
          {
            fonte: 'IMDb',
            valor: imdbRatingValue,
          },
          {
            fonte: faker.lorem.words(2),
            valor: faker.number.float({ min: 0, max: 10 }),
          },
        ],
        orcamento: budget,
        bilheteria: boxOffice,
        premios: award,
        sinopse: synopses,
      },
    ];

    const useCase = new GetParsedMoviesUseCase();
    const parsedMovies = useCase.execute(unparsedMovies);

    const expectedParsedMovies: ParsedMovieDTO[] = [
      {
        titulo: unparsedMovies[0].titulo,
        ano: unparsedMovies[0].ano,
        diretor: unparsedMovies[0].diretor,
        genero: unparsedMovies[0].genero,
        duracaoSegundos: durationTimeInMinutes * 60,
        notaIMDb: imdbRatingValue,
        lucro: formattedProfit,
        maiorPremiacao: award[0].nome,
        sinopse: synopses[0].texto,
      },
    ];

    expect(parsedMovies).toEqual(expectedParsedMovies);

    expect(MovieParsingHelper.convertDurationToSeconds).toHaveBeenCalledWith(
      durationTimeInMinutes,
    );
    expect(MovieParsingHelper.calculateProfit).toHaveBeenCalledWith(
      budget,
      boxOffice,
    );
    expect(MovieParsingHelper.getMostRelevantAward).toHaveBeenCalledWith(award);
    expect(MovieParsingHelper.getSynopsis).toHaveBeenCalledWith(synopses);
  });
});
