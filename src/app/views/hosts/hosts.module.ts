import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HostsRoutingModule } from './hosts-routing.module';
import { HostsComponent } from './hosts.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    HostsRoutingModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgxDatatableModule
  ],
  declarations: [HostsComponent, UpdateComponent, ViewComponent]
})
export class HostsModule { }
