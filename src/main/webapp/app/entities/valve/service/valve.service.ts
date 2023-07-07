import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IValve, NewValve } from '../valve.model';

export type PartialUpdateValve = Partial<IValve> & Pick<IValve, 'id'>;

export type EntityResponseType = HttpResponse<IValve>;
export type EntityArrayResponseType = HttpResponse<IValve[]>;

@Injectable({ providedIn: 'root' })
export class ValveService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/valves');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(valve: NewValve): Observable<EntityResponseType> {
    return this.http.post<IValve>(this.resourceUrl, valve, { observe: 'response' });
  }

  update(valve: IValve): Observable<EntityResponseType> {
    return this.http.put<IValve>(`${this.resourceUrl}/${this.getValveIdentifier(valve)}`, valve, { observe: 'response' });
  }

  partialUpdate(valve: PartialUpdateValve): Observable<EntityResponseType> {
    return this.http.patch<IValve>(`${this.resourceUrl}/${this.getValveIdentifier(valve)}`, valve, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IValve>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IValve[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getValveIdentifier(valve: Pick<IValve, 'id'>): number {
    return valve.id;
  }

  compareValve(o1: Pick<IValve, 'id'> | null, o2: Pick<IValve, 'id'> | null): boolean {
    return o1 && o2 ? this.getValveIdentifier(o1) === this.getValveIdentifier(o2) : o1 === o2;
  }

  addValveToCollectionIfMissing<Type extends Pick<IValve, 'id'>>(
    valveCollection: Type[],
    ...valvesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const valves: Type[] = valvesToCheck.filter(isPresent);
    if (valves.length > 0) {
      const valveCollectionIdentifiers = valveCollection.map(valveItem => this.getValveIdentifier(valveItem)!);
      const valvesToAdd = valves.filter(valveItem => {
        const valveIdentifier = this.getValveIdentifier(valveItem);
        if (valveCollectionIdentifiers.includes(valveIdentifier)) {
          return false;
        }
        valveCollectionIdentifiers.push(valveIdentifier);
        return true;
      });
      return [...valvesToAdd, ...valveCollection];
    }
    return valveCollection;
  }
}
