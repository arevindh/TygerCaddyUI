import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { ProxyService } from '../../../services/proxy/proxy.service';
import { Proxy } from '../../../models/Proxy';
import { HostService } from '../../../services/host/host.service';
import { Host } from '../../../models/Host';
import { HeaderService } from '../../../services/header/header.service';
import { Header } from '../../../models/Header';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  proxy: Proxy;
  page_title: string;
  id: number;
  edit_enabled: boolean;
  sub: any;
  isCollapsed: boolean = true;
  hosts: Host[];
  is_new: boolean = true;
  to_host: any;
  isValidFormSubmitted = false;

  constructor(private route: ActivatedRoute, private http: HttpClient,
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
      var fwd_host = +params['host'];
      if (this.id) {
        this.loadHostData()
      } else {
        this.loadDefault(fwd_host)
      }
    });

    this
      .hostService
      .getHosts()
      .subscribe((data: Host[]) => {
        this.hosts = data;
      });

  }

  loadHostData() {
    this.edit_enabled = false;
    this.is_new = false;
    this
      .proxyservice
      .getProxy(this.id)
      .subscribe((data: Proxy) => {
        this.proxy = data;
        console.log(this.proxy);
        this.page_title = "Proxy Details"
      });
  }

  loadDefault(fwd_host = null) {
    console.log('default loaded');
    this.to_host = fwd_host;
    this.edit_enabled = true;
    this.proxy = {
      id: null,
      name: "",
      proxy_from: "",
      proxy_to: "",
      load_policy: null,
      fail_timeout: null,
      max_fails: null,
      max_conns: null,
      try_duration: null,
      try_interval: null,
      health_check: null,
      health_check_port: null,
      health_check_interval: null,
      health_check_timeout: null,
      keep_alive: null,
      timeout: null,
      without: null,
      exceptions: null,
      insecure_skip_verify: false,
      websocket: false,
      transparent: false,
      host: fwd_host,
      header_set: null
    } as Proxy;
  }

  isDisabled(): boolean {
    return !this.edit_enabled;
  }

  toggle_edit() {
    this.edit_enabled = !this.edit_enabled;

    if (this.edit_enabled) {
      this.page_title = 'Edit Proxy ';
    } else {
      this.page_title = 'Proxy Details';
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(form: NgForm) {

    this.isValidFormSubmitted = false;
    if (form.invalid) {
      console.log('invalid form')
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.proxy);

    if (!this.is_new) {
      this
        .proxyservice
        .updateProxy(this.proxy, this.proxy.id)
        .subscribe((data: Proxy) => {
          this.proxy = data;
          this.page_title = 'Edit Proxy';
          this.toastr.success('Proxy Updated!', 'Success');
        },
          error => {
            this.toastr.error('Unable to update Proxy, Please check the values!', 'Failed');
          });


    }
    else {
      this
        .proxyservice
        .addProxy(this.proxy)
        .subscribe((data: Proxy) => {
          this.proxy = data;
          this.page_title = 'Edit Proxy';
          this.router.navigate([`/proxy/edit/${data.id}/`]);
          this.toastr.success('Proxy Added!', 'Success');
        },
          error => {
            this.toastr.error('Unable to add Proxy, Please check the values!', 'Failed');
          });

    }
  }

  setTitle(title, type) {
    this.page_title = title;
  }


  deleteHeader(header) {
    this
      .headerservice
      .deleteHeader(header.id)
      .subscribe(result => {
        this.loadHostData()
        this.toastr.success('Header deleted!', 'Success');
      }, error => {
        this.toastr.error('Unable to delete header', 'Failed');
      });
  }

  deleteProxy(proxy) {
    this
      .proxyservice
      .deleteProxy(proxy.id)
      .subscribe(result => {
        this.toastr.success('Proxy deleted!', 'Success');
        this.router.navigate(['/proxy/']);
      }, error => {
        this.toastr.error('Unable to add Proxy', 'Failed');
      });
  }



  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


}
