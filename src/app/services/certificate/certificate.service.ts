import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Certificate } from '../../models/Certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  url = '/api/certificate';
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

  getCertificates() {
    return this
      .http
      .get(`${this.url}/`, this.authHeader());
  }

  getCertificate(cert_id) {
    return this
      .http
      .get(`${this.url}/${cert_id}`, this.authHeader());
  }

  addCertificate(cert: Certificate) {

    return this
      .http
      .post(`${this.url}/`, cert, this.authHeader())
  }

  updateCertificate(cert: Certificate, cert_id) {
    return this
      .http
      .put(`${this.url}/${cert_id}/`, cert, this.authHeader())
  }
  deleteCertificate(cert_id) {
    return this
      .http
      .delete(`${this.url}/${cert_id}/`, this.authHeader())
  }

  validateToken() {

  }

}
