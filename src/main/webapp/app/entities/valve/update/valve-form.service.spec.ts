import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../valve.test-samples';

import { ValveFormService } from './valve-form.service';

describe('Valve Form Service', () => {
  let service: ValveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValveFormService);
  });

  describe('Service methods', () => {
    describe('createValveFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createValveFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            status: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IValve should create a new form with FormGroup', () => {
        const formGroup = service.createValveFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            status: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getValve', () => {
      it('should return NewValve for default Valve initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createValveFormGroup(sampleWithNewData);

        const valve = service.getValve(formGroup) as any;

        expect(valve).toMatchObject(sampleWithNewData);
      });

      it('should return NewValve for empty Valve initial value', () => {
        const formGroup = service.createValveFormGroup();

        const valve = service.getValve(formGroup) as any;

        expect(valve).toMatchObject({});
      });

      it('should return IValve', () => {
        const formGroup = service.createValveFormGroup(sampleWithRequiredData);

        const valve = service.getValve(formGroup) as any;

        expect(valve).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IValve should not enable id FormControl', () => {
        const formGroup = service.createValveFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewValve should disable id FormControl', () => {
        const formGroup = service.createValveFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
