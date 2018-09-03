import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Key } from '../../models/Key';
import { Bundle } from '../../models/Bundle';

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/bundle';
  token = localStorage.getItem('currentUser');
  cookieValue: any;

  authHeader() {
    this.cookieValue = this.cookieService.get('csrftoken');
    return {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookieValue,
        'Authorization': `Token ${this.token}`
      })
    };
  }

  getBundles() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getBundle(bundle_id) {
    return this
      .http
      .get(`${this.url}/${bundle_id}`, this.authHeader());
  }

  addBundle(bundle: Bundle) {

    return this
      .http
      .post(`${this.url}/`, bundle, this.authHeader())
  }

  updateBundle(bundle: Bundle, bundle_id) {
    return this
      .http
      .put(`${this.url}/${bundle_id}/`, bundle, this.authHeader())
  }

  deleteBundle(bundle_id) {
    return this
      .http
      .delete(`${this.url}/${bundle_id}/`, this.authHeader())
  }
}

