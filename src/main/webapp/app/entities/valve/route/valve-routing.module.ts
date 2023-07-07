import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ValveComponent } from '../list/valve.component';
import { ValveDetailComponent } from '../detail/valve-detail.component';
import { ValveUpdateComponent } from '../update/valve-update.component';
import { ValveRoutingResolveService } from './valve-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const valveRoute: Routes = [
  {
    path: '',
    component: ValveComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ValveDetailComponent,
    resolve: {
      valve: ValveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ValveUpdateComponent,
    resolve: {
      valve: ValveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ValveUpdateComponent,
    resolve: {
      valve: ValveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(valveRoute)],
  exports: [RouterModule],
})
export class ValveRoutingModule {}
