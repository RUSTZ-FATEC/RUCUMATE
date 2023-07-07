import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IValve } from '../valve.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../valve.test-samples';

import { ValveService } from './valve.service';

const requireRestSample: IValve = {
  ...sampleWithRequiredData,
};

describe('Valve Service', () => {
  let service: ValveService;
  let httpMock: HttpTestingController;
  let expectedResult: IValve | IValve[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ValveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Valve', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const valve = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(valve).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Valve', () => {
      const valve = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(valve).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Valve', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Valve', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Valve', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addValveToCollectionIfMissing', () => {
      it('should add a Valve to an empty array', () => {
        const valve: IValve = sampleWithRequiredData;
        expectedResult = service.addValveToCollectionIfMissing([], valve);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(valve);
      });

      it('should not add a Valve to an array that contains it', () => {
        const valve: IValve = sampleWithRequiredData;
        const valveCollection: IValve[] = [
          {
            ...valve,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addValveToCollectionIfMissing(valveCollection, valve);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Valve to an array that doesn't contain it", () => {
        const valve: IValve = sampleWithRequiredData;
        const valveCollection: IValve[] = [sampleWithPartialData];
        expectedResult = service.addValveToCollectionIfMissing(valveCollection, valve);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(valve);
      });

      it('should add only unique Valve to an array', () => {
        const valveArray: IValve[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const valveCollection: IValve[] = [sampleWithRequiredData];
        expectedResult = service.addValveToCollectionIfMissing(valveCollection, ...valveArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const valve: IValve = sampleWithRequiredData;
        const valve2: IValve = sampleWithPartialData;
        expectedResult = service.addValveToCollectionIfMissing([], valve, valve2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(valve);
        expect(expectedResult).toContain(valve2);
      });

      it('should accept null and undefined values', () => {
        const valve: IValve = sampleWithRequiredData;
        expectedResult = service.addValveToCollectionIfMissing([], null, valve, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(valve);
      });

      it('should return initial array if no Valve is added', () => {
        const valveCollection: IValve[] = [sampleWithRequiredData];
        expectedResult = service.addValveToCollectionIfMissing(valveCollection, undefined, null);
        expect(expectedResult).toEqual(valveCollection);
      });
    });

    describe('compareValve', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareValve(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareValve(entity1, entity2);
        const compareResult2 = service.compareValve(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareValve(entity1, entity2);
        const compareResult2 = service.compareValve(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareValve(entity1, entity2);
        const compareResult2 = service.compareValve(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
