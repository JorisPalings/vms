"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LandingComponent = (function () {
    function LandingComponent() {
    }
    return LandingComponent;
}());
LandingComponent = __decorate([
    core_1.Component({
        selector: 'landing-page',
        template: "\n  <div class=\"full-container\">\n    <header>\n      <div class=\"front-branding\">\n        <div class=\"logo\">\n          <img src=\"./dist/assets/images/craftworkz.svg\"/>\n        </div>\n        <div class=\"text-branding\">\n          Virtual Meeting Secretary\n        </div>\n      </div>\n    </header>\n    <div class=\"container\">\n        <div class=\"row full-height center-content-vertically\">\n            <div class=\"one-half column offset-by-three center-content\">\n                <login-form></login-form>\n            </div>\n        </div>\n    </div>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/landing-header.css']
    })
], LandingComponent);
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map