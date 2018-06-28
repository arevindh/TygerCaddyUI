import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProxyRoutingModule } from './proxy-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ProxyComponent } from './proxy.component';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ProxyRoutingModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [ViewComponent, EditComponent, ProxyComponent]
})
export class ProxyModule { }
