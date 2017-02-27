"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SettingsComponent = (function () {
    function SettingsComponent() {
    }
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: 'settings-page',
        template: "\n  <header class=\"private-dash-header\">\n      <branding></branding>\n      <div>\n          <h1>Settings</h1>\n      </div>\n      <profile></profile>\n  </header>\n  <main>\n      <div class=\"container\">\n          <div class=\"row\">\n              <div class=\"form five columns\">\n                  <h2>Profile information</h2>\n                  <form>\n                      <label for=\"first-name\">First name:</label>\n                      <input type=\"text\" id=\"first-name\" />\n                      <label for=\"last-name\">Last name:</label>\n                      <input type=\"text\" id=\"last-name\" />\n                      <label for=\"email\">Email:</label>\n                      <input type=\"email\" id=\"email\" />\n                      <label for=\"phone\">Telephone number:</label>\n                      <input type=\"tel\" id=\"phone\" />\n                      <button><i class=\"fa fa-floppy-o\"></i> Save changes</button>\n                      <a href=\"#\" class=\"float-left\">Change password</a>\n                      <a href=\"#\" class=\"float-right dangerous\">Delete account</a>\n                  </form>\n              </div>\n              <div class=\"form six columns offset-by-one\">\n                  <h2>Integrations</h2>\n                  <integration-buttons></integration-buttons>\n                  <h2>Calendars</h2>\n                  <calendar-list></calendar-list>\n              </div>\n          </div>\n      </div>\n  </main>\n  ",
        styleUrls: ['../dist/assets/css/settings.css']
    })
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map