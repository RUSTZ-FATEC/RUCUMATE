import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../esp-data.test-samples';

import { EspDataFormService } from './esp-data-form.service';

describe('EspData Form Service', () => {
  let service: EspDataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspDataFormService);
  });

  describe('Service methods', () => {
    describe('createEspDataFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEspDataFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sensorId: expect.any(Object),
            temperature: expect.any(Object),
            humidity: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IEspData should create a new form with FormGroup', () => {
        const formGroup = service.createEspDataFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sensorId: expect.any(Object),
            temperature: expect.any(Object),
            humidity: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getEspData', () => {
      it('should return NewEspData for default EspData initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEspDataFormGroup(sampleWithNewData);

        const espData = service.getEspData(formGroup) as any;

        expect(espData).toMatchObject(sampleWithNewData);
      });

      it('should return NewEspData for empty EspData initial value', () => {
        const formGroup = service.createEspDataFormGroup();

        const espData = service.getEspData(formGroup) as any;

        expect(espData).toMatchObject({});
      });

      it('should return IEspData', () => {
        const formGroup = service.createEspDataFormGroup(sampleWithRequiredData);

        const espData = service.getEspData(formGroup) as any;

        expect(espData).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEspData should not enable id FormControl', () => {
        const formGroup = service.createEspDataFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEspData should disable id FormControl', () => {
        const formGroup = service.createEspDataFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
