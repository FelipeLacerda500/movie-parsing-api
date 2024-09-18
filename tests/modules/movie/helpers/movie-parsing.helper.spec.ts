/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import { MovieParsingHelper } from '@/modules/movie/helpers';
import { Award, Rating, Synopsis } from '@/modules/movie/models';
import { faker } from '@faker-js/faker';

const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

describe('MovieParsingHelper', () => {
  describe('convertDurationToSeconds', () => {
    it('should convert minutes to seconds', () => {
      const minutes = faker.number.int({ min: 1 });
      const result = MovieParsingHelper.convertDurationToSeconds(minutes);
      expect(result).toBe(minutes * 60);
    });
  });

  describe('getIMDbRating', () => {
    it('should return the correct IMDb rating', () => {
      const imdbRating = {
        fonte: 'IMDb',
        valor: faker.number.float({ min: 0, max: 10 }),
      };

      const ratings: Rating[] = shuffleArray([
        { ...imdbRating },
        {
          fonte: faker.lorem.words(2),
          valor: faker.number.float({ min: 0, max: 10 }),
        },
        {
          fonte: faker.lorem.words(2),
          valor: faker.number.float({ min: 0, max: 10 }),
        },
      ]);

      const result = MovieParsingHelper.getIMDbRating(ratings);
      expect(result).toBe(imdbRating.valor);
    });

    it('should return undefined if IMDb rating is not found', () => {
      const ratings: Rating[] = [
        {
          fonte: faker.lorem.words(2),
          valor: faker.number.float({ min: 0, max: 10 }),
        },
        {
          fonte: faker.lorem.words(2),
          valor: faker.number.float({ min: 0, max: 10 }),
        },
        {
          fonte: faker.lorem.words(2),
          valor: faker.number.float({ min: 0, max: 10 }),
        },
      ];

      const result = MovieParsingHelper.getIMDbRating(ratings);
      expect(result).toBeUndefined();
    });
  });

  describe('calculateProfit', () => {
    it('should calculate profit in millions', () => {
      const budgetValue = faker.number.float({
        min: 1,
        max: 999,
      });
      const boxOfficeValue = faker.number.float({
        min: 1,
        max: 999,
      });

      const budget = `${budgetValue} milhões`;
      const boxOffice = `${boxOfficeValue} milhões`;

      const expectedProfit = boxOfficeValue * 1e6 - budgetValue * 1e6;
      const expectedFormattedProfit = `$${expectedProfit / 1e6} milhões`;

      const result = MovieParsingHelper.calculateProfit(budget, boxOffice);

      expect(result).toBe(expectedFormattedProfit);
    });

    it('should calculate profit in billions', () => {
      const budgetValue = faker.number.float({
        min: 1,
        max: 999,
      });
      const boxOfficeValue = faker.number.float({
        min: 1,
        max: 999,
      });

      const budget = `$${budgetValue} milhões`;
      const boxOffice = `$${boxOfficeValue} bilhões`;

      const expectedProfit = boxOfficeValue * 1e9 - budgetValue * 1e6;
      const expectedFormattedProfit = `$${expectedProfit / 1e9} bilhões`;

      const result = MovieParsingHelper.calculateProfit(budget, boxOffice);

      expect(result).toBe(expectedFormattedProfit);
    });
  });

  describe('getMostRelevantAward', () => {
    it('should return the most relevant award', () => {
      const mostRelevantAward = {
        nome: faker.word.noun(),
        relevancia: faker.number.int({ min: 10, max: 10 }),
      };

      const awards: Award[] = shuffleArray([
        { ...mostRelevantAward },
        {
          nome: faker.word.noun(),
          relevancia: faker.number.int({ min: 0, max: 9 }),
        },
        {
          nome: faker.word.noun(),
          relevancia: faker.number.int({ min: 0, max: 9 }),
        },
      ]);

      const result = MovieParsingHelper.getMostRelevantAward(awards);
      expect(result).toBe(mostRelevantAward.nome);
    });
  });

  describe('getSynopsis', () => {
    it('should return the synopsis in pt-br if available', () => {
      const ptbrSynopsis = {
        idioma: 'pt-br',
        texto: faker.lorem.sentences(2),
      };

      const synopses: Synopsis[] = shuffleArray([
        { ...ptbrSynopsis },
        {
          idioma: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
        {
          idioma: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
      ]);

      const result = MovieParsingHelper.getSynopsis(synopses);
      expect(result).toBe(ptbrSynopsis.texto);
    });

    it('should return the synopsis in en if pt-br is not available', () => {
      const enSynopsis = {
        idioma: 'en',
        texto: faker.lorem.sentences(2),
      };

      const synopses: Synopsis[] = shuffleArray([
        { ...enSynopsis },
        {
          idioma: faker.helpers.arrayElement(['es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
        {
          idioma: faker.helpers.arrayElement(['es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
      ]);

      const result = MovieParsingHelper.getSynopsis(synopses);
      expect(result).toBe(enSynopsis.texto);
    });

    it('should return the first synopsis if neither pt-br nor en are available', () => {
      const synopses: Synopsis[] = shuffleArray([
        {
          idioma: faker.helpers.arrayElement(['es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
        {
          idioma: faker.helpers.arrayElement(['es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
        {
          idioma: faker.helpers.arrayElement(['es', 'fr', 'de']),
          texto: faker.lorem.sentences(2),
        },
      ]);

      const result = MovieParsingHelper.getSynopsis(synopses);
      expect(result).toBe(synopses[0].texto);
    });
  });
});
