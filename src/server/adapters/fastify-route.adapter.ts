import { ApiRequest, ApiReply } from '@/server/@types';
import { IController } from '@/shared/protocols';

export function fastifyRouteAdapter(controller: IController) {
  return (request: ApiRequest, reply: ApiReply): Promise<ApiReply> => {
    return controller.handle(request, reply);
  };
}
