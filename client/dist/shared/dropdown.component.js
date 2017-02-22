"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DropdownComponent = (function () {
    function DropdownComponent() {
    }
    return DropdownComponent;
}());
DropdownComponent = __decorate([
    core_1.Component({
        selector: 'profile-dropdown',
        template: "\n  <div id=\"profileDropdown\" class=\"dropdown-content\">\n    <a href=\"#\"><i class=\"fa fa-cog fa-lg\"></i>Settings</a>\n    <a href=\"#\"><i class=\"fa fa-sign-out fa-lg\"></i>Log out</a>\n  </div>\n  ",
        styleUrls: ['../dist/assets/css/dropdown.css']
    })
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map