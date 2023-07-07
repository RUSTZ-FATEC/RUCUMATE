import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ValveFormService } from './valve-form.service';
import { ValveService } from '../service/valve.service';
import { IValve } from '../valve.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { ValveUpdateComponent } from './valve-update.component';

describe('Valve Management Update Component', () => {
  let comp: ValveUpdateComponent;
  let fixture: ComponentFixture<ValveUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let valveFormService: ValveFormService;
  let valveService: ValveService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ValveUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ValveUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ValveUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    valveFormService = TestBed.inject(ValveFormService);
    valveService = TestBed.inject(ValveService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const valve: IValve = { id: 456 };
      const user: IUser = { id: 1546 };
      valve.user = user;

      const userCollection: IUser[] = [{ id: 18998 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ valve });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const valve: IValve = { id: 456 };
      const user: IUser = { id: 91529 };
      valve.user = user;

      activatedRoute.data = of({ valve });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.valve).toEqual(valve);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IValve>>();
      const valve = { id: 123 };
      jest.spyOn(valveFormService, 'getValve').mockReturnValue(valve);
      jest.spyOn(valveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ valve });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: valve }));
      saveSubject.complete();

      // THEN
      expect(valveFormService.getValve).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(valveService.update).toHaveBeenCalledWith(expect.objectContaining(valve));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IValve>>();
      const valve = { id: 123 };
      jest.spyOn(valveFormService, 'getValve').mockReturnValue({ id: null });
      jest.spyOn(valveService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ valve: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: valve }));
      saveSubject.complete();

      // THEN
      expect(valveFormService.getValve).toHaveBeenCalled();
      expect(valveService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IValve>>();
      const valve = { id: 123 };
      jest.spyOn(valveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ valve });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(valveService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
