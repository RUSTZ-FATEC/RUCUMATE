import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'esp-data',
        data: { pageTitle: 'rucumateApp.espData.home.title' },
        loadChildren: () => import('./esp-data/esp-data.module').then(m => m.EspDataModule),
      },
      {
        path: 'notification',
        data: { pageTitle: 'rucumateApp.notification.home.title' },
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
      },
      {
        path: 'valve',
        data: { pageTitle: 'rucumateApp.valve.home.title' },
        loadChildren: () => import('./valve/valve.module').then(m => m.ValveModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
