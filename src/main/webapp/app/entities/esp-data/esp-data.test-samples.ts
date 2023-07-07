import { IEspData, NewEspData } from './esp-data.model';

export const sampleWithRequiredData: IEspData = {
  id: 14628,
};

export const sampleWithPartialData: IEspData = {
  id: 85561,
  humidity: 50019,
};

export const sampleWithFullData: IEspData = {
  id: 21105,
  sensorId: 'navigating',
  temperature: 60333,
  humidity: 36278,
};

export const sampleWithNewData: NewEspData = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
