import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Header } from '../../models/Header';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/headers';
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

  getHeaders() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getHeader(header_id) {
    return this
      .http
      .get(`${this.url}/${header_id}`, this.authHeader());
  }

  addHeader(header: Header) {
    console.log(this.cookieValue);
    return this
      .http
      .post(`${this.url}/`, header, this.authHeader())
  }

  updateHeader(header: Header, header_id) {
    this.cookieValue = this.cookieService.get('csrftoken');
    console.log(this.cookieValue);
    return this
      .http
      .put(`${this.url}/${header_id}/`, header, this.authHeader())
  }

  deleteHeader(header_id) {
    this.cookieValue = this.cookieService.get('csrftoken');
    console.log(this.cookieValue);
    return this
      .http
      .delete(`${this.url}/${header_id}/`, this.authHeader())
  }

  validateToken() {

  }
}
