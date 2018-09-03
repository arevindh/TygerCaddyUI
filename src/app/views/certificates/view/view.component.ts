import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from "../../../services/certificate/certificate.service";
import { BundleService } from "../../../services/bundle/bundle.service";
import { KeyService } from "../../../services/key/key.service";
import { Certificate } from '../../../models/Certificate';
import { Bundle } from '../../../models/Bundle';
import { Key } from '../../../models/Key';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  certs: Certificate[];
  bundles: Bundle[];
  keys: Key[];

  constructor(
    private certservice: CertificateService,
    private toastr: ToastrService,
    private bundleservice: BundleService,
    private keyservice: KeyService
  ) { }

  ngOnInit() {
    this.loadBundleKey();
    this.loadCertsList();
  }

  loadBundleKey() {
    this.bundleservice
      .getBundles()
      .subscribe((data: Bundle[]) => {
        this.bundles = data,
          console.log('Bundles Loaded');
      })

    this.keyservice
      .getKeys()
      .subscribe((data: Key[]) => {
        this.keys = data,
          console.log('Keys Loaded');
      })
  }


  getBundleById(id) {
    var bundle = this.bundles.find(x => x.id == id)
    return bundle;
  }

  getKeyById(id) {
    return this.keys.find(x => x.id == id)
  }

  loadCertsList() {
    this.certservice
      .getCertificates()
      .subscribe((data: Certificate[]) => {
        this.certs = data,
          console.log('Certs Loaded');
      })
  }

  deleteCert(cert) {
    this
      .certservice
      .deleteCertificate(cert.id)
      .subscribe(result => {
        this.removeFromList(cert);
        this.toastr.success('Certificate deleted!', 'Success');
      }, error => {
        this.toastr.error('Unable to delete certificate', 'Failed');
      });
  }

  removeFromList(cert) {
    this.certs = this.certs.filter(item => item !== cert);
  }

}
