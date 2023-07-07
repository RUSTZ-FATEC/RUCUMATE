import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEspData } from '../esp-data.model';
import { EspDataService } from '../service/esp-data.service';

@Injectable({ providedIn: 'root' })
export class EspDataRoutingResolveService implements Resolve<IEspData | null> {
  constructor(protected service: EspDataService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEspData | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((espData: HttpResponse<IEspData>) => {
          if (espData.body) {
            return of(espData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
