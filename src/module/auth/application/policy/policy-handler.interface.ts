import IRequestWithUser from '../interface/request-with-user.interface';

export interface IPolicyHandler {
  handle(request: IRequestWithUser): Promise<void>;
}
