"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MeetingComponent = (function () {
    function MeetingComponent() {
    }
    return MeetingComponent;
}());
MeetingComponent = __decorate([
    core_1.Component({
        selector: 'meeting',
        template: "\n  <div class=\"card-wrapper\">\n    <div class=\"meeting-card\">\n      <span class=\"time-box\">\n            <div class=\"time-box-container\">\n              <span class=\"start-time\">10:00</span>\n      <span> - </span>\n      <span class=\"end-time\">11:00</span>\n    </div>\n    </span>\n    <span class=\"meeting-info\">\n            <p>Sander Lenaerts</p>\n            <p>Virtual Meeting Secretary</p>\n            <p>Everest</p>\n          </span>\n    <span class=\"profile-image\">\n            <img src=\"https://s-media-cache-ak0.pinimg.com/originals/36/06/ce/3606cebe8d048b71aaea38b52c4eb4bd.jpg\">\n          </span>\n  </div>\n  <div class=\"bell\">\n    <span>Running late</span>\n  </div>\n</div>\n  ",
        styleUrls: ['../dist/assets/css/meeting.css']
    })
], MeetingComponent);
exports.MeetingComponent = MeetingComponent;
//# sourceMappingURL=meeting.component.js.map