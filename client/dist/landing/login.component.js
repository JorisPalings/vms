"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Credentials = (function () {
    function Credentials() {
    }
    return Credentials;
}());
exports.Credentials = Credentials;
var LoginComponent = (function () {
    function LoginComponent(http, loginUser) {
        this.http = http;
        this.loginUser = loginUser;
        this.submitted = false; // check if form is submitted
    }
    LoginComponent.prototype.ngOnInit = function () {
        // Initialize the model
        this.loginUser = {
            mail: '',
            password: ''
        };
    };
    LoginComponent.prototype.doLogin = function (credentials, isValid) {
        // Check if model is valid
        // if valid, call API (express) to login with credentials
        // Setting the header, telling the express API we are sending json
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.submitted = true;
        //Check if the credentials entered are valid
        if (isValid) {
            console.log('Request sent', this.loginUser);
            this.http.post('http://localhost:3000/api/login', JSON.stringify(this.loginUser), { headers: headers }).subscribe(function (err) { return console.log(err); });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-form',
        providers: [Credentials],
        template: "\n  <div class=\"form\">\n    <h1 class=\"form-title\">Login</h1>\n    <div *ngIf=\"submitted\">\n      <p>Your form has been submitted.</p>\n    </div>\n    <form *ngIf=\"!submitted\" #login=\"ngForm\" novalidate (ngSubmit)=\"doLogin(login.value, login.valid)\">\n    <!--show error only when field is not valid & it's dirty or form submited-->\n        <small *ngIf=\"mail.invalid || (!mail.pristine && login.submitted)\">\n            E-mail is required.\n        </small>\n\n        <input type=\"email\" name=\"mail\" [(ngModel)]=\"loginUser.mail\" #mail=\"ngModel\" required placeholder=\"EMAIL\" autofocus />\n\n        <small [hidden]=\"password.valid || (password.pristine && !login.submitted)\">\n            Password is required.\n        </small>\n\n        <input type=\"password\" placeholder=\"PASSWORD\" name=\"password\" [(ngModel)]=\"loginUser.password\" #password=\"ngModel\" required />\n\n        <span class=\"form-instruction\"><a href=\"#\">Forgot your password?</a></span>\n\n        <button type=\"submit\" [disabled]=\"!login.valid\">LOG IN</button>\n        <span class=\"form-instruction\">Need an account? <a href=\"#\">Register</a></span>\n    </form>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/login-form.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, Credentials])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map