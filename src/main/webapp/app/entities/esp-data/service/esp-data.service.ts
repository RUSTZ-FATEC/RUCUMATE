import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEspData, NewEspData } from '../esp-data.model';

export type PartialUpdateEspData = Partial<IEspData> & Pick<IEspData, 'id'>;

export type EntityResponseType = HttpResponse<IEspData>;
export type EntityArrayResponseType = HttpResponse<IEspData[]>;

@Injectable({ providedIn: 'root' })
export class EspDataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/esp-data');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(espData: NewEspData): Observable<EntityResponseType> {
    return this.http.post<IEspData>(this.resourceUrl, espData, { observe: 'response' });
  }

  update(espData: IEspData): Observable<EntityResponseType> {
    return this.http.put<IEspData>(`${this.resourceUrl}/${this.getEspDataIdentifier(espData)}`, espData, { observe: 'response' });
  }

  partialUpdate(espData: PartialUpdateEspData): Observable<EntityResponseType> {
    return this.http.patch<IEspData>(`${this.resourceUrl}/${this.getEspDataIdentifier(espData)}`, espData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEspData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEspData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEspDataIdentifier(espData: Pick<IEspData, 'id'>): number {
    return espData.id;
  }

  compareEspData(o1: Pick<IEspData, 'id'> | null, o2: Pick<IEspData, 'id'> | null): boolean {
    return o1 && o2 ? this.getEspDataIdentifier(o1) === this.getEspDataIdentifier(o2) : o1 === o2;
  }

  addEspDataToCollectionIfMissing<Type extends Pick<IEspData, 'id'>>(
    espDataCollection: Type[],
    ...espDataToCheck: (Type | null | undefined)[]
  ): Type[] {
    const espData: Type[] = espDataToCheck.filter(isPresent);
    if (espData.length > 0) {
      const espDataCollectionIdentifiers = espDataCollection.map(espDataItem => this.getEspDataIdentifier(espDataItem)!);
      const espDataToAdd = espData.filter(espDataItem => {
        const espDataIdentifier = this.getEspDataIdentifier(espDataItem);
        if (espDataCollectionIdentifiers.includes(espDataIdentifier)) {
          return false;
        }
        espDataCollectionIdentifiers.push(espDataIdentifier);
        return true;
      });
      return [...espDataToAdd, ...espDataCollection];
    }
    return espDataCollection;
  }
}
