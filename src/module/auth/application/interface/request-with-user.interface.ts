import { Request } from 'express';
import { User } from '../../domain/user.entity';

interface IRequestWithUser extends Request {
  user: User;
}

export default IRequestWithUser;
