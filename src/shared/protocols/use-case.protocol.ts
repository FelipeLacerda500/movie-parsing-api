/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IUseCase<DTO = any, Response = any> {
  execute(data: DTO): Response;
}
