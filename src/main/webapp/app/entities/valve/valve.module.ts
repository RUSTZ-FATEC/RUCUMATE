import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ValveComponent } from './list/valve.component';
import { ValveDetailComponent } from './detail/valve-detail.component';
import { ValveUpdateComponent } from './update/valve-update.component';
import { ValveDeleteDialogComponent } from './delete/valve-delete-dialog.component';
import { ValveRoutingModule } from './route/valve-routing.module';

@NgModule({
  imports: [SharedModule, ValveRoutingModule],
  declarations: [ValveComponent, ValveDetailComponent, ValveUpdateComponent, ValveDeleteDialogComponent],
})
export class ValveModule {}
