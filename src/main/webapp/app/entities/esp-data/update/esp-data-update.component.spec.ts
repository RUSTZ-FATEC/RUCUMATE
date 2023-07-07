import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EspDataFormService } from './esp-data-form.service';
import { EspDataService } from '../service/esp-data.service';
import { IEspData } from '../esp-data.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { EspDataUpdateComponent } from './esp-data-update.component';

describe('EspData Management Update Component', () => {
  let comp: EspDataUpdateComponent;
  let fixture: ComponentFixture<EspDataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let espDataFormService: EspDataFormService;
  let espDataService: EspDataService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EspDataUpdateComponent],
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
      .overrideTemplate(EspDataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EspDataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    espDataFormService = TestBed.inject(EspDataFormService);
    espDataService = TestBed.inject(EspDataService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const espData: IEspData = { id: 456 };
      const user: IUser = { id: 75605 };
      espData.user = user;

      const userCollection: IUser[] = [{ id: 19651 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ espData });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const espData: IEspData = { id: 456 };
      const user: IUser = { id: 16475 };
      espData.user = user;

      activatedRoute.data = of({ espData });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.espData).toEqual(espData);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspData>>();
      const espData = { id: 123 };
      jest.spyOn(espDataFormService, 'getEspData').mockReturnValue(espData);
      jest.spyOn(espDataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espData });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: espData }));
      saveSubject.complete();

      // THEN
      expect(espDataFormService.getEspData).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(espDataService.update).toHaveBeenCalledWith(expect.objectContaining(espData));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspData>>();
      const espData = { id: 123 };
      jest.spyOn(espDataFormService, 'getEspData').mockReturnValue({ id: null });
      jest.spyOn(espDataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espData: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: espData }));
      saveSubject.complete();

      // THEN
      expect(espDataFormService.getEspData).toHaveBeenCalled();
      expect(espDataService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspData>>();
      const espData = { id: 123 };
      jest.spyOn(espDataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espData });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(espDataService.update).toHaveBeenCalled();
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
