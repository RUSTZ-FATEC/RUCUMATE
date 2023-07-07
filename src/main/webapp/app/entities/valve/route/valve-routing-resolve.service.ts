import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IValve } from '../valve.model';
import { ValveService } from '../service/valve.service';

@Injectable({ providedIn: 'root' })
export class ValveRoutingResolveService implements Resolve<IValve | null> {
  constructor(protected service: ValveService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IValve | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((valve: HttpResponse<IValve>) => {
          if (valve.body) {
            return of(valve.body);
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
