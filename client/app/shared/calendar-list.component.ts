import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'calendar-list',
    template: `
        <fieldset *ngFor="let cal of calendars">
            <input type="checkbox" id="cal-{{cal.id}}" />
            <label for="cal-{{cal.id}}">{{cal.summaryOverride || cal.summary }}</label>
        </fieldset>
    `,
    styleUrls: ['../dist/assets/css/integrations.css', '../dist/assets/css/calendars.css']
})

export class CalendarListComponent implements OnInit {

  private calendars;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getCalendars()
      .subscribe(data => {
        console.log("Data", data);
        this.calendars = data.calendars;
        console.log("Calendars", this.calendars);
      },
      error => console.log(error));
  }

}
