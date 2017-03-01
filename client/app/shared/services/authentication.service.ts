import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
import { Employee } from '../../_models/employee';

@Injectable()
export class AuthenticationService {
  public token: string;
  public employee: string;
  public email: string;
  public currentUser: Employee = <Employee>({
    fname: "",
    lname: "",
    email: "",
    pictureURL: ""
  });


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
    //return Observable.throw(err.json().data || 'Server error.');
  }

  constructor(private http: Http, private cookieService: CookieService){
      var cookie = cookieService.get('currentUser');
      if (cookie){
        var currentUser = JSON.parse(cookieService.get('currentUser'));
        this.token = currentUser && currentUser.token;
        this.employee = currentUser && currentUser.id;
        this.email = currentUser && currentUser.email;


      }
  }

  emptyServiceData(){
    console.log("Emptying cookie");
    // Delete currentUser cookie
    this.cookieService.remove('currentUser');

    // Empty the authentication service data
    console.log("Emptying service data");
    this.token = null;
    this.email = null;
    this.employee = null;
  }

  getEmail() {
    var currentUser = JSON.parse(this.cookieService.get('currentUser'));
    return currentUser.email;
  }

  logout(){
    // Send the logout request to express --> loopback
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = { token: this.token};


    return this.http.post('http://localhost:3000/api/logout', JSON.stringify(data), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  login(credentials: any): Observable<boolean> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/login', JSON.stringify(credentials), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response.json());

        let token = response.json() && response.json().id;
        if (token) {
            // set token property
            this.token = token;
            this.email = credentials.mail;
            this.employee = response.json().userId;




            // store username and jwt token as cookie to keep user logged in between page refreshes
            this.cookieService.put('currentUser', JSON.stringify({ email: credentials.mail, token: token, id: response.json().userId }));


            return true;
        }
        else {
            // return false to indicate failed login
            return false;
        }
      })
      .catch(this.handleError)

  }

  requestUserData(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    // Request additional data of logged in user
    var data = {
      token: this.token,
      id: this.employee
    }

    return this.http.post('http://localhost:3000/api/user', JSON.stringify(data), options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  register(userData: any): Observable<boolean> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/register', JSON.stringify(userData), options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }
}
