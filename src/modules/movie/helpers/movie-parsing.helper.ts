/* eslint-disable arrow-body-style */
import { Award, Rating, Synopsis } from '../models';

export class MovieParsingHelper {
  public static convertDurationToSeconds(minutes: number): number {
    const durationInSeconds = minutes * 60;

    return durationInSeconds;
  }

  public static getIMDbRating(ratings: Rating[]): number {
    const imdbRating = ratings.find((rating) => rating.fonte === 'IMDb');

    return imdbRating?.valor;
  }

  public static calculateProfit(budget: string, boxOffice: string): string {
    const convertCurrencyStringToNumber = (value: string): number => {
      const sanitizedCurrencyString = value
        .replace(/[^0-9.,bi|mi]/g, '')
        .toLowerCase();

      const numericValue = parseFloat(
        sanitizedCurrencyString.replace(/[,]/g, '.'),
      );

      if (sanitizedCurrencyString.includes('bi')) {
        return numericValue * 1e9;
      }

      return numericValue * 1e6;
    };

    const budgetAmount = convertCurrencyStringToNumber(budget);
    const boxOfficeAmount = convertCurrencyStringToNumber(boxOffice);

    const calculatedProfit = boxOfficeAmount - budgetAmount;

    const formatProfitAsCurrency = (value: number): string => {
      if (Math.abs(value) >= 1e9) {
        return `$${value / 1e9} bilhões`;
      }
      return `$${value / 1e6} milhões`;
    };

    return formatProfitAsCurrency(calculatedProfit);
  }

  public static getMostRelevantAward(awards: Award[]): string {
    const mostRelevantAward = awards.reduce((prev, current) => {
      return current.relevancia > prev.relevancia ? current : prev;
    });

    return mostRelevantAward.nome;
  }

  public static getSynopsis(synopses: Synopsis[]): string {
    const synopsisPTBR = synopses.find(
      (synopsis) => synopsis.idioma === 'pt-br',
    );
    if (synopsisPTBR) {
      return synopsisPTBR.texto;
    }

    const synopsisEN = synopses.find((synopsis) => synopsis.idioma === 'en');
    if (synopsisEN) {
      return synopsisEN.texto;
    }

    return synopses[0].texto;
  }
}
