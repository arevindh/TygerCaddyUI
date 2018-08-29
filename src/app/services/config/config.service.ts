import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../../models/Config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/config';
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

  getSettings() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  updateSettings(host: Config) {
    return this
      .http
      .put(`${this.url}/1/`, host, this.authHeader())
  }

  validateToken() {

  }

}
