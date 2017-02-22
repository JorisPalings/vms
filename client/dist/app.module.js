"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var landing_component_1 = require("./landing/landing.component");
var private_dashboard_component_1 = require("./private_dashboard/private_dashboard.component");
var public_dashboard_component_1 = require("./public_dashboard/public_dashboard.component");
var register_component_1 = require("./register/register.component");
var settings_component_1 = require("./settings/settings.component");
var not_found_component_1 = require("./not-found/not-found.component");
var login_component_1 = require("./landing/login.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.appRouting
        ],
        declarations: [
            app_component_1.AppComponent,
            landing_component_1.LandingComponent,
            private_dashboard_component_1.PrivateDashboardComponent,
            public_dashboard_component_1.PublicDashboardComponent,
            register_component_1.RegisterComponent,
            settings_component_1.SettingsComponent,
            not_found_component_1.NotFoundComponent,
            login_component_1.LoginComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map