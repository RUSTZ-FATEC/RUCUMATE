import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EspDataDetailComponent } from './esp-data-detail.component';

describe('EspData Management Detail Component', () => {
  let comp: EspDataDetailComponent;
  let fixture: ComponentFixture<EspDataDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspDataDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ espData: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EspDataDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EspDataDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load espData on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.espData).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
