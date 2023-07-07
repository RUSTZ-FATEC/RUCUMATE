import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IValve, NewValve } from '../valve.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IValve for edit and NewValveFormGroupInput for create.
 */
type ValveFormGroupInput = IValve | PartialWithRequiredKeyOf<NewValve>;

type ValveFormDefaults = Pick<NewValve, 'id' | 'status'>;

type ValveFormGroupContent = {
  id: FormControl<IValve['id'] | NewValve['id']>;
  status: FormControl<IValve['status']>;
  user: FormControl<IValve['user']>;
};

export type ValveFormGroup = FormGroup<ValveFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ValveFormService {
  createValveFormGroup(valve: ValveFormGroupInput = { id: null }): ValveFormGroup {
    const valveRawValue = {
      ...this.getFormDefaults(),
      ...valve,
    };
    return new FormGroup<ValveFormGroupContent>({
      id: new FormControl(
        { value: valveRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      status: new FormControl(valveRawValue.status, {
        validators: [Validators.required],
      }),
      user: new FormControl(valveRawValue.user),
    });
  }

  getValve(form: ValveFormGroup): IValve | NewValve {
    return form.getRawValue() as IValve | NewValve;
  }

  resetForm(form: ValveFormGroup, valve: ValveFormGroupInput): void {
    const valveRawValue = { ...this.getFormDefaults(), ...valve };
    form.reset(
      {
        ...valveRawValue,
        id: { value: valveRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ValveFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}
