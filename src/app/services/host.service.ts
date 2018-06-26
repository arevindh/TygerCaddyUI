import { Injectable, Host } from '@angular/core';
import { HttpClient,HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private http: HttpClient) { }
  url = '/api/hosts';
  token =   localStorage.getItem('currentUser');

  getHosts() {
    return this
      .http
      .get(`${this.url}/`,{headers: new HttpHeaders().set('Authorization', `Token ${this.token}`)});
  }

  getHost(host_id) {
    return this
      .http
      .get(`${this.url}/${host_id}`,{headers: new HttpHeaders().set('Authorization', `Token ${this.token}`)});
  }
  addHost(host : Host){
    return this
    .http
    .post(`${this.url}/`,host,{ headers: new HttpHeaders().set('Authorization', `Token ${this.token}`)})
  }

  validateToken(){
    
  }
  
}
