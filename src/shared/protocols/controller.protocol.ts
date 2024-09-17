/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IController<Request = any, Reply = any> {
  handle(request: Request, reply: Reply): Promise<Reply>;
}
