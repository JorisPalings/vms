"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LoginComponent = (function () {
    function LoginComponent() {
    }
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-form',
        template: "\n  <div class=\"form\">\n    <h1 class=\"form-title\">Login</h1>\n    <form>\n        <input type=\"text\" placeholder=\"EMAIL\" autofocus />\n        <input type=\"password\" placeholder=\"PASSWORD\" />\n        <span class=\"form-instruction\"><a href=\"#\">Forgot your password?</a></span>\n        <button type=\"submit\">LOG IN</button>\n        <span class=\"form-instruction\">Need an account? <a href=\"#\">Register</a></span>\n    </form>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/login-form.css']
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map