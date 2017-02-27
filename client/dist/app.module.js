"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var app_component_1 = require("./app.component");
// Validators
var equal_validator_directive_1 = require("./directives/equal-validator.directive");
// Services
// Components
var app_routing_1 = require("./app.routing");
var landing_component_1 = require("./landing/landing.component");
var private_dashboard_component_1 = require("./private_dashboard/private_dashboard.component");
var public_dashboard_component_1 = require("./public_dashboard/public_dashboard.component");
var register_component_1 = require("./register/register.component");
var registration_component_1 = require("./register/registration.component");
var integrations_component_1 = require("./integrations/integrations.component");
var calendars_component_1 = require("./calendars/calendars.component");
var settings_component_1 = require("./settings/settings.component");
var not_found_component_1 = require("./not-found/not-found.component");
var login_component_1 = require("./landing/login.component");
var timeline_component_1 = require("./shared/timeline.component");
var meeting_component_1 = require("./shared/meeting.component");
var dropdown_component_1 = require("./shared/dropdown.component");
var branding_component_1 = require("./shared/branding.component");
var profile_component_1 = require("./shared/profile.component");
var integration_buttons_component_1 = require("./shared/integration-buttons.component");
var calendar_list_component_1 = require("./shared/calendar-list.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.appRouting,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            equal_validator_directive_1.EqualValidator,
            landing_component_1.LandingComponent,
            private_dashboard_component_1.PrivateDashboardComponent,
            public_dashboard_component_1.PublicDashboardComponent,
            register_component_1.RegisterComponent,
            registration_component_1.RegistrationComponent,
            integrations_component_1.IntegrationsComponent,
            calendars_component_1.CalendarsComponent,
            settings_component_1.SettingsComponent,
            not_found_component_1.NotFoundComponent,
            login_component_1.LoginComponent,
            branding_component_1.BrandingComponent,
            meeting_component_1.MeetingComponent,
            timeline_component_1.TimelineComponent,
            dropdown_component_1.DropdownComponent,
            profile_component_1.ProfileComponent,
            integration_buttons_component_1.IntegrationButtonsComponent,
            calendar_list_component_1.CalendarListComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [cookies_service_1.CookieService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map