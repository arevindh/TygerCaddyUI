import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { HostService } from '../../../services/host/host.service';
import { Host } from '../../../models/Host';
import { ProxyService } from '../../../services/proxy/proxy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {

  host: Host;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private hostService: HostService,
    private proxyservice: ProxyService,
    private toastr: ToastrService,
    private router: Router) {
    this.ssl_provider = "letsencrypt";
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";
  ssl_provider: string;
  sub: any;
  page_title: string;
  type: string;
  id: number;
  edit_enabled: boolean;
  is_new: boolean = true;

  setTitle(title, type) {
    this.page_title = title;
  }

  ngOnInit() {

    this.edit_enabled = false;

    this.sub = this.route
      .data
      .subscribe(
        v => this.setTitle(v.title, v.type),
    );

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.loadHostData();
        this.is_new = false;
      } else {
        this.loadDefault()
      }
    });

  }

  loadHostData() {
    this.edit_enabled = false;
    this
      .hostService
      .getHost(this.id)
      .subscribe((data: Host) => {
        this.host = data;
        console.log(this.host)
      });


  }

  loadDefault() {
    console.log('default loaded');
    this.edit_enabled = true;
    this.host = {
      id: null,
      host_name: "",
      root_path: "/",
      tls: true,
      staging: false,
      dns_verification: false,
      dns_provider: null,
      custom_ssl: false,
      custom_certs: [],
      force_redirect_https: true,
      proxy_set: []
    } as Host;
  }

  isDisabled(): boolean {
    return !this.edit_enabled;
  }

  toggle_edit() {
    this.edit_enabled = !this.edit_enabled;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteHost(host: Host) {
    this
      .hostService
      .deleteHost(host.id)
      .subscribe();
    this.router.navigate(['/hosts/']);
    // this.host = this.hosts.filter(item => item !== host);
  }

  onSubmit() {

    if (this.is_new) {
      this
        .hostService
        .addHost(this.host)
        .subscribe((data: Host) => {
          this.host = data;
          this.page_title = 'Edit host';
          this.router.navigate([`/hosts/edit/${data.id}/`]);
          this.toastr.success('Host Updated!', 'Success');
        },
          error => {
            this.toastr.error('Unable to update Host, Please check the values!', 'Failed');
          });


    } else {
      this
        .hostService
        .updateHost(this.host, this.host.id)
        .subscribe((data: Host) => {
          this.host = data;
          this.page_title = 'Edit host';
          this.toastr.success('Host Added!', 'Success');
        },
          error => {
            this.toastr.error('Unable to add Host, Please check the values!', 'Failed');
          });
    }

  }
}
