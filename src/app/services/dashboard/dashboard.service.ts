
import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Stats } from '../../models/Stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/stats';
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

  getStats() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }


}
