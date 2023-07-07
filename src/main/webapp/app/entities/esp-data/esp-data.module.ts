import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EspDataComponent } from './list/esp-data.component';
import { EspDataDetailComponent } from './detail/esp-data-detail.component';
import { EspDataUpdateComponent } from './update/esp-data-update.component';
import { EspDataDeleteDialogComponent } from './delete/esp-data-delete-dialog.component';
import { EspDataRoutingModule } from './route/esp-data-routing.module';

@NgModule({
  imports: [SharedModule, EspDataRoutingModule],
  declarations: [EspDataComponent, EspDataDetailComponent, EspDataUpdateComponent, EspDataDeleteDialogComponent],
})
export class EspDataModule {}
