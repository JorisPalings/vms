"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var meeting_service_1 = require("./services/meeting.service");
var TimelineComponent = (function () {
    function TimelineComponent(meetingService) {
        this.meetingService = meetingService;
    }
    TimelineComponent.prototype.ngOnInit = function () {
        this.meetingService.getAllMeetings().subscribe(function (data) { return console.log(data); });
    };
    return TimelineComponent;
}());
TimelineComponent = __decorate([
    core_1.Component({
        selector: 'timeline',
        template: "\n  <section>\n    <div class=\"timerow\">\n      <div class=\"date\">Today</div>\n      <meeting></meeting>\n    </div>\n    <div class=\"timerow\">\n      <div class=\"date\"></div>\n      <meeting></meeting>\n    </div>\n    <div class=\"timerow padded\">\n      <div class=\"date\">Friday</div>\n      <meeting></meeting>\n    </div>\n    <div class=\"timerow padded\">\n      <div class=\"date\">21 Feb 2017</div>\n      <meeting></meeting>\n    </div>\n  </section>\n  ",
        styleUrls: ['../dist/assets/css/timeline.css']
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService])
], TimelineComponent);
exports.TimelineComponent = TimelineComponent;
//# sourceMappingURL=timeline.component.js.map