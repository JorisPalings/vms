"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PrivateDashboardComponent = (function () {
    function PrivateDashboardComponent() {
    }
    return PrivateDashboardComponent;
}());
PrivateDashboardComponent = __decorate([
    core_1.Component({
        selector: 'private-dashboard',
        template: "\n  <header class=\"private-dash-header\">\n    <branding></branding>\n    <h1>Meetings</h1>\n    <profile></profile>\n  </header>\n  <main>\n    <timeline></timeline>\n  </main>\n  ",
        styleUrls: ['../dist/assets/css/private-dash.css']
    })
], PrivateDashboardComponent);
exports.PrivateDashboardComponent = PrivateDashboardComponent;
//# sourceMappingURL=private_dashboard.component.js.map