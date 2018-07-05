import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    token = localStorage.getItem('currentUser');
    cookieValue: any;

    login(username: string, password: string) {
        return this.http.post<any>('/api-auth/login/', { username: username, password: password }, this.authHeader())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.key) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.key);
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    authHeader() {
        this.cookieValue = this.cookieService.get('csrftoken');
        return {
          headers: new HttpHeaders({
            'X-CSRFToken': this.cookieValue
          })
        };
      }
    

}
