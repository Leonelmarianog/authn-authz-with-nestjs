import { AutoMap } from '@automapper/classes';

export class BaseEntity {
  @AutoMap()
  id: number;

  @AutoMap()
  createdAt: string;

  @AutoMap()
  updatedAt: string;

  @AutoMap()
  deletedAt: string;
}
