"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-page',
        template: "\n  <div class=\"container\">\n    <div class=\"row form full-height center-content-vertically\">\n      <div class=\"one-half column offset-by-three center-content\">\n        <h1 class=\"form-title\">Registration</h1>\n        <div class=\"step current-step\"></div>\n        <div class=\"step\"></div>\n        <h2 class=\"form-subtitle\">Step 1 - Credentials</h2>\n        <form>\n          <input type=\"text\" id=\"email\" placeholder=\"EMAIL\" autofocus />\n          <input type=\"password\" id=\"password\" placeholder=\"PASSWORD\" />\n          <div id=\"rating\"></div>\n          <input type=\"password\" id=\"repeat-password\" placeholder=\"REPEAT PASSWORD\" />\n          <button type=\"submit\">NEXT</button>\n        </form>\n      </div>\n    </div>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/landing-header.css']
    })
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map