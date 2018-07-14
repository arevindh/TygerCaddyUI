import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  header: Header;
  proxy: Proxy[];
  host: Host;
  edit_enabled: boolean;
  sub: any;
  is_new: boolean = true;
  page_title: string;
  to_proxy: any;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private proxyservice: ProxyService,
    private hostService: HostService,
    private headerservice: HeaderService,
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
        this.loadHeaderData()
      } else {
        this.loadDefault(fwd_host)
      }
    });

    this
    .proxyservice
    .getProxies()
    .subscribe((data: Proxy[]) => {
      this.proxy = data;
    });
  }

  loadHeaderData() {
    this.edit_enabled = false;
    this.is_new = false;
    this
      .headerservice
      .getHeader(this.id)
      .subscribe((data: Header) => {
        this.header = data;
        console.log(this.header);
        this.page_title = "Header Details "
      });

  }

  loadDefault(fwd_proxy = null) {
    console.log('default loaded');
    this.to_proxy = fwd_proxy;
    this.edit_enabled = true;
    this.header = {
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

  onSubmit() {
    console.log(this.header);

    if (!this.is_new) {
      this
        .headerservice
        .updateHeader(this.header, this.header.id)
        .subscribe((data: Header) => {
          this.header = data;
          this.page_title = 'Edit Header';
        });
    }
    else {
      this
        .headerservice
        .addHeader(this.header)
        .subscribe((data: Header) => {
          this.header = data;
          this.page_title = 'Edit header';
          this.router.navigate([`/headers/edit/${data.id}/`]);
        });

    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
