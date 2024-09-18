/* eslint-disable init-declarations */
/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MockProxy, mock } from 'vitest-mock-extended';
import { GetParsedMoviesController } from '@/modules/movie/controllers';
import { IUseCase } from '@/shared/protocols';
import { ApiRequest, ApiReply } from '@/server/@types';
import { fetchMoviesHelper } from '@/modules/movie/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Movie } from '@/modules/movie/models';

vi.mock('@/modules/movie/helpers', () => ({
  fetchMoviesHelper: vi.fn(),
}));

describe('GetParsedMoviesController', () => {
  let sut: GetParsedMoviesController;
  let useCaseMock: MockProxy<IUseCase>;
  let movieListMock: Movie[];
  let apiRequestMock: MockProxy<ApiRequest>;
  let apiReplyMock: MockProxy<ApiReply>;

  const makeUseCaseMock = () => {
    useCaseMock = mock<IUseCase>();
    useCaseMock.execute.mockReturnValue(movieListMock);
    return useCaseMock;
  };

  const makeApiReplyMock = () => {
    apiReplyMock = mock<ApiReply>();
    apiReplyMock.status.mockReturnThis();
    apiReplyMock.send.mockReturnThis();
    return apiReplyMock;
  };

  beforeEach(() => {
    useCaseMock = makeUseCaseMock();
    movieListMock = [];
    apiReplyMock = makeApiReplyMock();
    apiRequestMock = mock<ApiRequest>();
    sut = new GetParsedMoviesController(useCaseMock);
  });

  it('should call fetchMoviesHelper with correct URL', async () => {
    await sut.handle(apiRequestMock, apiReplyMock);

    expect(fetchMoviesHelper).toHaveBeenCalledWith(
      'https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/',
    );
  });

  it('should call UseCase.execute with the movie list', async () => {
    vi.mocked(fetchMoviesHelper).mockResolvedValueOnce(movieListMock);

    await sut.handle(apiRequestMock, apiReplyMock);

    expect(useCaseMock.execute).toHaveBeenCalledWith(movieListMock);
  });

  it('should return 200 and parsed movies if valid data is provided', async () => {
    vi.mocked(fetchMoviesHelper).mockResolvedValueOnce(movieListMock);

    await sut.handle(apiRequestMock, apiReplyMock);

    expect(apiReplyMock.status).toHaveBeenCalledWith(200);
    expect(apiReplyMock.send).toHaveBeenCalledWith({
      filmes: movieListMock,
    });
  });

  it('should propagate unhandled error to error handler when fetchMoviesHelper throws', async () => {
    vi.mocked(fetchMoviesHelper).mockRejectedValueOnce(
      new Error('Internal server error.'),
    );

    await expect(sut.handle(apiRequestMock, apiReplyMock)).rejects.toThrow(
      'Internal server error.',
    );
  });
});
