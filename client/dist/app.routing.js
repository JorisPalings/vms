"use strict";
var router_1 = require("@angular/router");
var landing_component_1 = require("./landing/landing.component");
var private_dashboard_component_1 = require("./private_dashboard/private_dashboard.component");
var public_dashboard_component_1 = require("./public_dashboard/public_dashboard.component");
var register_component_1 = require("./register/register.component");
var settings_component_1 = require("./settings/settings.component");
var not_found_component_1 = require("./not-found/not-found.component");
var appRoutes = [
    {
        path: '',
        component: landing_component_1.LandingComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'private-dashboard',
        component: private_dashboard_component_1.PrivateDashboardComponent
    },
    {
        path: 'public-dashboard',
        component: public_dashboard_component_1.PublicDashboardComponent
    },
    {
        path: 'settings',
        component: settings_component_1.SettingsComponent
    },
    {
        path: '**',
        component: not_found_component_1.NotFoundComponent
    }
];
exports.appRouting = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map