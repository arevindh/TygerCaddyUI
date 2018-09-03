import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from "../../../services/certificate/certificate.service";
import { BundleService } from "../../../services/bundle/bundle.service";
import { KeyService } from "../../../services/key/key.service";
import { Certificate } from '../../../models/Certificate';
import { Bundle } from '../../../models/Bundle';
import { Key } from '../../../models/Key';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  cert: Certificate;
  bundles: Bundle[];
  keys: Key[];
  edit_enabled: boolean;
  sub: any;
  page_title: string;
  id: number;
  to_host: any;
  is_new: boolean = true;
  is_upload: boolean = true;

  isValidFormSubmitted = false;

  t_bundle_file: any = null;
  t_key_file: any = null;


  constructor(
    private certservice: CertificateService,
    private toastr: ToastrService,
    private bundleservice: BundleService,
    private keyservice: KeyService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.initcerts();
    this.loadBundleKey();
  }


  initcerts() {
    this.edit_enabled = false;

    this.sub = this.route
      .data
      .subscribe(
        v => this.setTitle(v.title, v.type),
      );

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      var fwd_host = +params['host'];
      if (this.id) {
        this.loadCertData()
      } else {
        this.loadDefault(fwd_host)
      }
    });

  }

  loadCertData() {
    this.edit_enabled = false;
    this.is_new = false;
    this
      .certservice
      .getCertificate(this.id)
      .subscribe((data: Certificate) => {
        this.cert = data;
        // console.log(this.cert);
        this.page_title = "Certificate Details"
      });
  }

  loadDefault(fwd_host = null) {
    console.log('default loaded');
    this.to_host = fwd_host;
    this.edit_enabled = true;
    this.cert = {
      bundle_upload: null,
      key_upload: null,
      ssl_staging: null,
      bundle_text: null,
      key_text: null
    } as Certificate;
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


  readBundle(form: NgForm) {

    var bundle_file = (<HTMLInputElement>document.getElementById("bundle_file")).files[0];

    if (bundle_file.size > 16000) {
      form.form.controls['bundle_file'].setErrors({ 'error': 'Maximum file size is 16 Kb' });
      return false;
    }

    var text = null;
    var reader = new FileReader();
    reader.onload = () => {
      // this 'text' is the content of the file
      var text = reader.result;
      this.cert.bundle_text = text;
    }
    reader.readAsText(bundle_file);
  }

  readKey(form: NgForm) {

    // console.log(form);
    var key_file = (<HTMLInputElement>document.getElementById("key_file")).files[0];

    if (key_file.size > 8000) {
      form.form.controls['key_file'].setErrors({ 'error': 'Maximum file size is 8 Kb' });
      return false;
    }

    var reader = new FileReader();
    reader.onload = () => {
      // this 'text' is the content of the file
      var text = reader.result;
      this.cert.key_text = text;
    }
    reader.readAsText(key_file);
  }

  deleteCert(cert) {
    this
      .certservice
      .deleteCertificate(cert.id)
      .subscribe(result => {
        this.toastr.success('Certificate deleted!', 'Success');
        this.router.navigate(['/certificates/']);
      }, error => {
        this.toastr.error('Unable to delete certificate', 'Failed');
      });
  }

  isDisabled(): boolean {
    return !this.edit_enabled;
  }

  toggle_edit() {
    this.edit_enabled = !this.edit_enabled;

    if (this.edit_enabled) {
      this.page_title = 'Edit Certificate';
    } else {
      this.page_title = 'Certificate Details';
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setTitle(title, type) {
    this.page_title = title;
  }

  onSubmit(form: NgForm) {

    this.isValidFormSubmitted = false;



    if (form.invalid) {
      console.log('invalid form')
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.cert);

    if (!this.is_new) {
      this
        .certservice
        .updateCertificate(this.cert, this.cert.id)
        .subscribe((data: Certificate) => {
          this.cert = data;
          this.page_title = 'Edit Certificate';
          this.toastr.success('Certificate Updated!', 'Success');
        },
          error => {
            this.toastr.error('Unable to update Certificate, Please check the values!', 'Failed');
          });


    }
    else {
      this
        .certservice
        .addCertificate(this.cert)
        .subscribe((data: Certificate) => {
          this.cert = data;
          this.page_title = 'Edit Proxy';
          this.router.navigate([`/certificates/edit/${data.id}/`]);
          this.toastr.success('Certificate Added!', 'Success');
        },
          error => {
            this.toastr.error('Unable to add Certificate, Please check the values!', 'Failed');
          });

    }
  }


}
