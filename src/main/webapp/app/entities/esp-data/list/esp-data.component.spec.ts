import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EspDataService } from '../service/esp-data.service';

import { EspDataComponent } from './esp-data.component';

describe('EspData Management Component', () => {
  let comp: EspDataComponent;
  let fixture: ComponentFixture<EspDataComponent>;
  let service: EspDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'esp-data', component: EspDataComponent }]), HttpClientTestingModule],
      declarations: [EspDataComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
                'filter[someId.in]': 'dc4279ea-cfb9-11ec-9d64-0242ac120002',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(EspDataComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EspDataComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EspDataService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.espData?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to espDataService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEspDataIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEspDataIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
