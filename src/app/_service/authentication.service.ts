import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions ,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private url="http://localhost:1922/api/login";
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: Http) { }

  login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
       // let urlSearchParams = new URLSearchParams();
       // urlSearchParams.append('username', username);
       // urlSearchParams.append('password', password);
        var body = 'username='+username+'&password='+password;
    return this.http.post(this.url, body, {headers:headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user= response.json();
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        else
          {
            return false;
          }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
