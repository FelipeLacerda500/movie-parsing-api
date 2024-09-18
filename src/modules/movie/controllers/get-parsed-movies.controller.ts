import { ApiRequest, ApiReply } from '@/server/@types';
import { fetchMoviesHelper } from '../helpers';
import { IController, IUseCase } from '@/shared/protocols';

export class GetParsedMoviesController
  implements IController<ApiRequest, ApiReply>
{
  constructor(private readonly getParsedMoviesUseCase: IUseCase) {}

  public async handle(request: ApiRequest, reply: ApiReply): Promise<ApiReply> {
    const movieList = await fetchMoviesHelper(
      'https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/',
    );

    const movies = this.getParsedMoviesUseCase.execute(movieList);

    return reply.status(200).send({ filmes: movies });
  }
}
