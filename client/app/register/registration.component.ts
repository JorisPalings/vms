import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'registration-form',
  template: `
  <h1 class="form-title">Registration</h1>
  <div class="step current-step"></div>
  <div class="step"></div>
  <div class="step"></div>
  <h2 class="form-subtitle">Step 1 - Credentials</h2>
  <form>
      <input type="text" id="email" placeholder="EMAIL" autofocus />
      <input type="password" #password id="password" placeholder="PASSWORD" />
      <div id="rating"></div>
      <input type="password" id="repeat-password" placeholder="REPEAT PASSWORD" />
      <button type="submit">NEXT</button>
  </form>
  `,
  styleUrls: ['../dist/assets/css/registration-form.css']
})

export class RegistrationComponent {
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
	            passwordInput.style.borderColor = "grey"
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
