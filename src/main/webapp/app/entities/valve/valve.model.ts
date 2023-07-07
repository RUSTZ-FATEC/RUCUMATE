import { IUser } from 'app/entities/user/user.model';

export interface IValve {
  id: number;
  status?: boolean | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewValve = Omit<IValve, 'id'> & { id: null };
