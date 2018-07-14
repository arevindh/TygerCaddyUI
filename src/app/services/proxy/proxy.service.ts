import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Proxy } from '../../models/Proxy';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/proxies';
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

  getProxies() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getProxy(proxy_id) {
    return this
      .http
      .get(`${this.url}/${proxy_id}`, this.authHeader());
  }

  addProxy(proxy: Proxy) {
    return this
      .http
      .post(`${this.url}/`, proxy, this.authHeader())
  }

  updateProxy(proxy: Proxy, proxy_id) {
    this.cookieValue = this.cookieService.get('csrftoken');
    return this
      .http
      .put(`${this.url}/${proxy_id}/`, proxy, this.authHeader())
  }

  deleteProxy(proxy_id) {
    this.cookieValue = this.cookieService.get('csrftoken');
    return this
      .http
      .delete(`${this.url}/${proxy_id}/`, this.authHeader())
  }

  validateToken() {

  }
}
