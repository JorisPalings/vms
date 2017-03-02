import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

//Authentication Service
import { AuthenticationService } from '../shared/services/authentication.service';

// RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'registration-form',
  template: `
  <h1 class="form-title">Registration</h1>
  <div class="step current-step"></div>
  <div class="step"></div>
  <div class="step"></div>
  <h2 class="form-subtitle">Step 1 - Credentials</h2>
  <div *ngIf="errors">
    <li *ngFor="let error of errors">
      {{error}}
    </li>
  </div>
  <form (ngSubmit)="doRegister()" [formGroup]="form">
      <div *ngIf="form.controls['firstname'].hasError('required') && form.controls['firstname'].touched" class="alert alert-danger">You must include a first name.</div>
      <input type="text" name="firstname" id="firstname" placeholder="First name" autofocus required [formControl]="form.controls['firstname']"/>

      <div *ngIf="form.controls['lastname'].hasError('required') && form.controls['lastname'].dirt" class="alert alert-danger">You must include a last name.</div>
      <input type="text" name="lastname" id="lastname" placeholder="Last name" autofocus required [formControl]="form.controls['lastname']"/>

      <input type="text" name="mail" id="email" placeholder="Email" autofocus required [formControl]="form.controls['mail']"/>

      <input type="password" #password id="password" placeholder="Password" [formControl]="form.controls['password']" />

      <input type="password" id="repeatpassword" placeholder="Repeat password" [formControl]="form.controls['repeatpassword']" validateEqual="password" #repeatpassword />
      <small [hidden]="form.controls['repeatpassword'].valid ||  (form.controls['repeatpassword'].pristine && !form.submitted)">
        Password mismatch
      </small>
      <button type="submit" [disabled]="!form.valid">Next</button>
      <span class="form-instruction float-right">Already have an account? <a routerLink="/">Log in</a></span>
  </form>
  `,
  styleUrls: ['../dist/assets/css/registration-form.css']
})

export class RegistrationComponent implements OnInit {

  submitted: boolean = false; // check if the form has been submitted
  form: FormGroup;
  private errors: string[];

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService){}

  ngOnInit(){
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      mail: [null, Validators.required],
      password: [null, Validators.required],
      repeatpassword: [null, Validators.required]
    })
  }

  doRegister(isValid: boolean){
    this.errors = [];

    this.authenticationService.register(this.form.value)
      .subscribe(
        data => {
          //TODO: Log in the user
          console.log(this.form.value.mail);
          console.log(this.form.value.password);

          var credentials = {
            mail: this.form.value.mail,
            password: this.form.value.password
          }

          // Send the login request using the authentication service
          this.authenticationService.login(credentials)
            .subscribe(data => {
              console.log('Login after register success', data);
            },
            error => console.error(error));

          // Route to the integrations step
          this.router.navigate(['/integrations']);
        },
        err => {
          console.log(err);
          // Show an error message
          this.errors.push(err);
        }
      );
  }

    // Password strength
    // TODO: Remove from borders and text, make a seperate text block to indicate strength

    @ViewChild('password') input:ElementRef;

    ngAfterViewInit() {
        var passwordInput = this.input.nativeElement;

        // Function to rate a password based on length as well as complexity
        // http://stackoverflow.com/questions/948172/password-strength-meter
        function ratePassword(password) {
            var score = 0;

            // Award every unique letter until 5 repetitions
            var letters = new Object();
            for(var i = 0; i < password.length; i ++) {
                letters[password[i]] = (letters[password[i]] || 0) + 1;
                score += 5.0 / letters[password[i]];
            }

            // Bonus points for mixing it up
            var variations = {
            	digits: /\d/.test(password),
                lower: /[a-z]/.test(password),
                upper: /[A-Z]/.test(password),
                nonWords: /\W/.test(password),
            }

            var variationCount = 0;
            for(var check in variations) {
            	variationCount += (variations[check] == true) ? 1 : 0;
            }
            score += (variationCount - 1) * 10;

        	// Change the text color of the password input field accordingly
            if(score > 80) {
            	passwordInput.style.color = "green";
	            passwordInput.style.borderColor = "green";
            } else if(score > 60) {
            	passwordInput.style.color = "yellow";
	            passwordInput.style.borderColor = "yellow";
            } else if(score > 30) {
            	passwordInput.style.color = "orange";
	            passwordInput.style.borderColor = "orange";
            } else if(score >= 5) {
            	passwordInput.style.color = "red";
	            passwordInput.style.borderColor = "red";
            } else {
            	passwordInput.style.color = "grey";
	            passwordInput.style.borderColor = "grey";
            }
        }

        passwordInput.oninput = function() {
        	this.onkeydown = null;
          	ratePassword(this.value);
        };

        passwordInput.onkeydown = function() {
        	ratePassword(this.value);
        };
	}
}
