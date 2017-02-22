"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var BrandingComponent = (function () {
    function BrandingComponent() {
    }
    return BrandingComponent;
}());
BrandingComponent = __decorate([
    core_1.Component({
        selector: 'branding',
        template: "\n  <div class=\"branding equal-box\">\n    <div class=\"branding-logo\">\n      <img src=\"../dist/assets/images/craftworkz.svg\">\n    </div>\n    <div class=\"branding-text\">\n      <span>Virtual</span>\n      <span>Meeting</span>\n      <span>Secretary</span>\n    </div>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/branding.css']
    })
], BrandingComponent);
exports.BrandingComponent = BrandingComponent;
//# sourceMappingURL=branding.component.js.map