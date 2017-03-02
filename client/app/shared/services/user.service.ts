import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

  private handleError(err) {
    let errorMessage: string;
    if (err instanceof Response){
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errorMessage = `${error}`;
    }
    else {
      errorMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errorMessage);
  }

  constructor(private http: Http, private authenticationService: AuthenticationService){}

  getCalendars(): Observable<any> {
    console.log('2 - userService');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let email = this.authenticationService.getEmail();
    var json = JSON.stringify({email: email, access_token: this.authenticationService.token});

    console.log('3 - userService');

    return this.http.post('http://localhost:3000/api/google-calendars', json, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  getCurrentCalendars(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let id = this.authenticationService.getId();

    var json = JSON.stringify({id: id, access_token: this.authenticationService.token});

    return this.http.post('http://localhost:3000/api/calendars', json, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  linkCalendars(cals: any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      "calendars" : {
        "calendars": cals
      },
      "id": this.authenticationService.employee,
      "token": this.authenticationService.token
    }

    return this.http.post('http://localhost:3000/api/link-calendars', JSON.stringify(data), options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }
}
