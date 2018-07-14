import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/hosts';
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

  getHosts() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getHost(host_id) {
    return this
      .http
      .get(`${this.url}/${host_id}`, this.authHeader());
  }

  addHost(host: Host) {
    
    return this
      .http
      .post(`${this.url}/`, host, this.authHeader())
  }

  updateHost(host: Host, host_id) {
    return this
      .http
      .put(`${this.url}/${host_id}/`, host, this.authHeader())
  }
  deleteHost(host_id) {
    return this
      .http
      .delete(`${this.url}/${host_id}/`, this.authHeader())
  }

  validateToken() {

  }

}
