import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ValveFormService, ValveFormGroup } from './valve-form.service';
import { IValve } from '../valve.model';
import { ValveService } from '../service/valve.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'app-valve-update',
  templateUrl: './valve-update.component.html',
})
export class ValveUpdateComponent implements OnInit {
  isSaving = false;
  valve: IValve | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: ValveFormGroup = this.valveFormService.createValveFormGroup();

  constructor(
    protected valveService: ValveService,
    protected valveFormService: ValveFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valve }) => {
      this.valve = valve;
      if (valve) {
        this.updateForm(valve);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const valve = this.valveFormService.getValve(this.editForm);
    if (valve.id !== null) {
      this.subscribeToSaveResponse(this.valveService.update(valve));
    } else {
      this.subscribeToSaveResponse(this.valveService.create(valve));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IValve>>): void {
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

  protected updateForm(valve: IValve): void {
    this.valve = valve;
    this.valveFormService.resetForm(this.editForm, valve);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, valve.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.valve?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
