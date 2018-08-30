import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/header/header.service';
import { Header } from '../../../models/Header';
import { ProxyService } from '../../../services/proxy/proxy.service';
import { Proxy } from '../../../models/Proxy';
import { HostService } from '../../../services/host/host.service';
import { Host } from '../../../models/Host';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  headerdata: Header;
  proxylist : Proxy[];
  host: Host;
  edit_enabled: boolean;
  sub: any;
  is_new: boolean = true;
  page_title: string;
  to_proxy: any;
  isValidFormSubmitted = false;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private proxyservice: ProxyService,
    private hostService: HostService,
    private headerservice: HeaderService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.edit_enabled = false;
    this.sub = this.route
      .data
      .subscribe(
        v => this.setTitle(v.title, v.type),
      );


    this.route.params.subscribe(params => {
      this.id = +params['id'];
      var fwd_proxy = +params['proxy'];
      if (this.id) {
        this.loadHeaderData()
      } else {
        this.loadDefault(fwd_proxy)
      }
    });

    this
      .proxyservice
      .getProxies()
      .subscribe((data: Proxy[]) => {
        this.proxylist = data;
      });
  }

  loadHeaderData() {
    this.edit_enabled = false;
    this.is_new = false;
    this
      .headerservice
      .getHeader(this.id)
      .subscribe((data: Header) => {
        this.headerdata = data;
        console.log(this.headerdata);
        this.page_title = "Header Details "
      });

  }

  loadDefault(fwd_proxy = null) {
    console.log('default loaded');
    this.to_proxy = fwd_proxy;
    this.edit_enabled = true;
    this.headerdata = {
      id: null,
      header: "",
      upstream: false,
      downstream: false,
      value: "",
      proxy: fwd_proxy
    } as Header;
  }

  setTitle(title, type) {
    this.page_title = title;
  }

  isDisabled(): boolean {
    return !this.edit_enabled;
  }

  toggle_edit() {
    this.edit_enabled = !this.edit_enabled;

    if (this.edit_enabled) {
      this.page_title = 'Edit Header ';
    } else {
      this.page_title = 'Header Details';
    }
  }

  onSubmit(form: NgForm) {
    // console.log(this.header);


    this.isValidFormSubmitted = false;

    // check the host is valid or not
    if (!this.headerdata.proxy) {
      form.form.controls['proxy'].setErrors({ 'required': true });
    }

    if (form.invalid) {
      console.log('invalid form')
      return;
    }
    this.isValidFormSubmitted = true;

    if (!this.is_new) {
      this
        .headerservice
        .updateHeader(this.headerdata, this.headerdata.id)
        .subscribe((data: Header) => {
          this.headerdata = data;
          this.page_title = 'Edit Header';
          this.toastr.success('Header Updated!', 'Success');
        },
          error => {
            this.toastr.error('Unable to update Header, Please check the values!', 'Failed');
          }
        );

    }
    else {
      this
        .headerservice
        .addHeader(this.headerdata)
        .subscribe((data: Header) => {
          this.headerdata = data;
          this.page_title = 'Edit header';
          this.router.navigate([`/headers/edit/${data.id}/`]);
          this.toastr.success('Header Added!', 'Success');
        },
          error => {
            this.toastr.error('Unable to add Header, Please check the values!', 'Failed');
          });

    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
