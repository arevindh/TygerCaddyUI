import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates.component';

@NgModule({
  imports: [
    CommonModule,
    CertificatesRoutingModule
  ],
  declarations: [CertificatesComponent]
})
export class CertificatesModule { }
