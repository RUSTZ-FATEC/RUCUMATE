import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEspData, NewEspData } from '../esp-data.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEspData for edit and NewEspDataFormGroupInput for create.
 */
type EspDataFormGroupInput = IEspData | PartialWithRequiredKeyOf<NewEspData>;

type EspDataFormDefaults = Pick<NewEspData, 'id'>;

type EspDataFormGroupContent = {
  id: FormControl<IEspData['id'] | NewEspData['id']>;
  sensorId: FormControl<IEspData['sensorId']>;
  temperature: FormControl<IEspData['temperature']>;
  humidity: FormControl<IEspData['humidity']>;
  user: FormControl<IEspData['user']>;
};

export type EspDataFormGroup = FormGroup<EspDataFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EspDataFormService {
  createEspDataFormGroup(espData: EspDataFormGroupInput = { id: null }): EspDataFormGroup {
    const espDataRawValue = {
      ...this.getFormDefaults(),
      ...espData,
    };
    return new FormGroup<EspDataFormGroupContent>({
      id: new FormControl(
        { value: espDataRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sensorId: new FormControl(espDataRawValue.sensorId),
      temperature: new FormControl(espDataRawValue.temperature),
      humidity: new FormControl(espDataRawValue.humidity),
      user: new FormControl(espDataRawValue.user),
    });
  }

  getEspData(form: EspDataFormGroup): IEspData | NewEspData {
    return form.getRawValue() as IEspData | NewEspData;
  }

  resetForm(form: EspDataFormGroup, espData: EspDataFormGroupInput): void {
    const espDataRawValue = { ...this.getFormDefaults(), ...espData };
    form.reset(
      {
        ...espDataRawValue,
        id: { value: espDataRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EspDataFormDefaults {
    return {
      id: null,
    };
  }
}
