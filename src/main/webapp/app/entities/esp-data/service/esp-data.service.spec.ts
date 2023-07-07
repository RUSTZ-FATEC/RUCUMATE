import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEspData } from '../esp-data.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../esp-data.test-samples';

import { EspDataService } from './esp-data.service';

const requireRestSample: IEspData = {
  ...sampleWithRequiredData,
};

describe('EspData Service', () => {
  let service: EspDataService;
  let httpMock: HttpTestingController;
  let expectedResult: IEspData | IEspData[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EspDataService);
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

    it('should create a EspData', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const espData = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(espData).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EspData', () => {
      const espData = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(espData).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EspData', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EspData', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EspData', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEspDataToCollectionIfMissing', () => {
      it('should add a EspData to an empty array', () => {
        const espData: IEspData = sampleWithRequiredData;
        expectedResult = service.addEspDataToCollectionIfMissing([], espData);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(espData);
      });

      it('should not add a EspData to an array that contains it', () => {
        const espData: IEspData = sampleWithRequiredData;
        const espDataCollection: IEspData[] = [
          {
            ...espData,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEspDataToCollectionIfMissing(espDataCollection, espData);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EspData to an array that doesn't contain it", () => {
        const espData: IEspData = sampleWithRequiredData;
        const espDataCollection: IEspData[] = [sampleWithPartialData];
        expectedResult = service.addEspDataToCollectionIfMissing(espDataCollection, espData);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(espData);
      });

      it('should add only unique EspData to an array', () => {
        const espDataArray: IEspData[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const espDataCollection: IEspData[] = [sampleWithRequiredData];
        expectedResult = service.addEspDataToCollectionIfMissing(espDataCollection, ...espDataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const espData: IEspData = sampleWithRequiredData;
        const espData2: IEspData = sampleWithPartialData;
        expectedResult = service.addEspDataToCollectionIfMissing([], espData, espData2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(espData);
        expect(expectedResult).toContain(espData2);
      });

      it('should accept null and undefined values', () => {
        const espData: IEspData = sampleWithRequiredData;
        expectedResult = service.addEspDataToCollectionIfMissing([], null, espData, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(espData);
      });

      it('should return initial array if no EspData is added', () => {
        const espDataCollection: IEspData[] = [sampleWithRequiredData];
        expectedResult = service.addEspDataToCollectionIfMissing(espDataCollection, undefined, null);
        expect(expectedResult).toEqual(espDataCollection);
      });
    });

    describe('compareEspData', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEspData(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEspData(entity1, entity2);
        const compareResult2 = service.compareEspData(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEspData(entity1, entity2);
        const compareResult2 = service.compareEspData(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEspData(entity1, entity2);
        const compareResult2 = service.compareEspData(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
