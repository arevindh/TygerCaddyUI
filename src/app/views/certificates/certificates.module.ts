import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [CertificatesComponent, ViewComponent, EditComponent]
})
export class CertificatesModule { }
