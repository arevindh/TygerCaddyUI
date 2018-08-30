import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../models/Config';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

import { ConfigService } from '../../services/config/config.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  page_title: string;
  type: string;
  id: number;
  edit_enabled: boolean;
  sub: any;
  config: Config;
  isValidFormSubmitted = false;


  setTitle(title, type) {
    this.page_title = title;
  }

  isDisabled(): boolean {
    return !this.edit_enabled;
  }

  ngOnInit() {
    this.edit_enabled = false;

    this.sub = this.route
      .data
      .subscribe(
        v => this.setTitle(v.title, v.type),
      );

    this.loadConfig();

  }

  loadConfig() {
    console.log('test')
    this.edit_enabled = false;
    this
      .configService
      .getSettings()
      .subscribe((data: Config) => {
        this.config = data[0];
        console.log(this.config)
      });
  }

  toggle_edit() {
    this.edit_enabled = !this.edit_enabled;
  }
  onSubmit(form: NgForm) {

    this.isValidFormSubmitted = false;

    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;


    // if (!this.config.interface) {
    //   this.config.interface = '0.0.0.0'
    // }

    // if (!this.config.port) {
    //   this.config.port = 8080;
    // }

    // if (!this.config.proxy_exception) {
    //   this.config.proxy_exception = '/assets'
    // }

    // if (!this.config.root_dir) {
    //   this.config.root_dir = '/apps/TygerCaddy/TygerCaddy'
    // }

    this
      .configService
      .updateSettings(this.config)
      .subscribe((data: Config) => {
        this.config = data;
        this.page_title = 'Edit Sttings';
        this.toastr.success('Config Saved!', 'Success');
      },
        error => {
          this.toastr.error('Unable to configuration, Please check the values!', 'Failed');
        });
  }



}
