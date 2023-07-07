import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EspDataFormService, EspDataFormGroup } from './esp-data-form.service';
import { IEspData } from '../esp-data.model';
import { EspDataService } from '../service/esp-data.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'app-esp-data-update',
  templateUrl: './esp-data-update.component.html',
})
export class EspDataUpdateComponent implements OnInit {
  isSaving = false;
  espData: IEspData | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: EspDataFormGroup = this.espDataFormService.createEspDataFormGroup();

  constructor(
    protected espDataService: EspDataService,
    protected espDataFormService: EspDataFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ espData }) => {
      this.espData = espData;
      if (espData) {
        this.updateForm(espData);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const espData = this.espDataFormService.getEspData(this.editForm);
    if (espData.id !== null) {
      this.subscribeToSaveResponse(this.espDataService.update(espData));
    } else {
      this.subscribeToSaveResponse(this.espDataService.create(espData));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspData>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(espData: IEspData): void {
    this.espData = espData;
    this.espDataFormService.resetForm(this.editForm, espData);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, espData.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.espData?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
