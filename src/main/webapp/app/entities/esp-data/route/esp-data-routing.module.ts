import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EspDataComponent } from '../list/esp-data.component';
import { EspDataDetailComponent } from '../detail/esp-data-detail.component';
import { EspDataUpdateComponent } from '../update/esp-data-update.component';
import { EspDataRoutingResolveService } from './esp-data-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const espDataRoute: Routes = [
  {
    path: '',
    component: EspDataComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EspDataDetailComponent,
    resolve: {
      espData: EspDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EspDataUpdateComponent,
    resolve: {
      espData: EspDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EspDataUpdateComponent,
    resolve: {
      espData: EspDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(espDataRoute)],
  exports: [RouterModule],
})
export class EspDataRoutingModule {}
