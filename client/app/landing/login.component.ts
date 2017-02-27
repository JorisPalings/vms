import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';


// RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class Credentials {
  mail: string;
  password: string;
}

@Component({
  selector: 'login-form',
  providers: [Credentials],
  template: `
  <div class="form">
    <h1 class="form-title">Login</h1>
    <div *ngIf="submitted">
      <p>Your form has been submitted.</p>
    </div>
    <form *ngIf="!submitted" #login="ngForm" novalidate (ngSubmit)="doLogin(login.value, login.valid)">
    <!--show error only when field is not valid & it's dirty or form submited-->
        <small *ngIf="mail.invalid || (!mail.pristine && login.submitted)">
            E-mail is required.
        </small>

        <input type="email" name="mail" [(ngModel)]="loginUser.mail" #mail="ngModel" required placeholder="EMAIL" autofocus />

        <small [hidden]="password.valid || (password.pristine && !login.submitted)">
            Password is required.
        </small>

        <input type="password" placeholder="PASSWORD" name="password" [(ngModel)]="loginUser.password" #password="ngModel" required />

        <span class="form-instruction"><a href="#">Forgot your password?</a></span>

        <button type="submit" [disabled]="!login.valid">LOG IN</button>
        <span class="form-instruction">Need an account? <a href="#">Register</a></span>
    </form>
  </div>
  `,
  styleUrls: ['../dist/assets/css/login-form.css']
})

export class LoginComponent implements OnInit {
  submitted: boolean = false; // check if form is submitted

  constructor(private http: Http, public loginUser: Credentials) {}

  private errors: string[];
  private api: string = "http://localhost:3000/api/"

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

  ngOnInit() {
    // Initialize the model
    this.loginUser = {
      mail: '',
      password: ''
    }
  }

  doLogin(credentials: Credentials, isValid: boolean){
    // Check if model is valid
    // if valid, call API (express) to login with credentials

    // Setting the header, telling the express API we are sending json
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.submitted = true;

    //Check if the credentials entered are valid
    if (isValid) {
      this.errors = [];
      console.log(credentials);

      let bodyString = JSON.stringify(credentials);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers }); // Create a request option


      this.http.post(this.api + 'login', bodyString, options)
                      .map(res => res.json())
                      .catch(this.handleError)
                      .subscribe(
                        info => console.log("info", info)

                          //TODO: Save the token in localStorage or as cookie
                          //TODO: Route to the dashboard
                        ,
                        err => {
                          console.log("error", err);
                          // show an error message
                          this.errors.push(err);
                        });
    }
  }

}
