import { IValve, NewValve } from './valve.model';

export const sampleWithRequiredData: IValve = {
  id: 70448,
  status: false,
};

export const sampleWithPartialData: IValve = {
  id: 6326,
  status: false,
};

export const sampleWithFullData: IValve = {
  id: 38304,
  status: false,
};

export const sampleWithNewData: NewValve = {
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
