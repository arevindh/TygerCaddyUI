import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Key } from '../../models/Key';
import { Bundle } from '../../models/Bundle';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/key';
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

  getKeys() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getKey(key_id) {
    return this
      .http
      .get(`${this.url}/${key_id}`, this.authHeader());
  }

  addKey(key: Key) {

    return this
      .http
      .post(`${this.url}/`, key, this.authHeader())
  }

  updateKey(key: Key, key_id) {
    return this
      .http
      .put(`${this.url}/${key_id}/`, key, this.authHeader())
  }

  deleteKey(cert_id) {
    return this
      .http
      .delete(`${this.url}/${cert_id}/`, this.authHeader())
  }
}

