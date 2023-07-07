import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ValveDetailComponent } from './valve-detail.component';

describe('Valve Management Detail Component', () => {
  let comp: ValveDetailComponent;
  let fixture: ComponentFixture<ValveDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValveDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ valve: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ValveDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ValveDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load valve on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.valve).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
