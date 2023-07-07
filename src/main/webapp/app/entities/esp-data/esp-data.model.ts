import { IUser } from 'app/entities/user/user.model';

export interface IEspData {
  id: number;
  sensorId?: string | null;
  temperature?: number | null;
  humidity?: number | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewEspData = Omit<IEspData, 'id'> & { id: null };
