import { Component } from '@angular/core';

@Component({
    selector: 'calendar-list',
    template: `
        <fieldset>
            <input type="checkbox" id="cal0" />
            <label for="cal0">Personal</label>
        </fieldset>
        <fieldset>
            <input type="checkbox" id="cal1" />
            <label for="cal1">Meetings</label>
        </fieldset>
        <fieldset>
            <input type="checkbox" id="cal2" />
            <label for="cal2">Birthdays</label>
        </fieldset>
        <fieldset>
            <input type="checkbox" id="cal3" />
            <label for="cal3">Holidays</label>
        </fieldset>
    `,
    styleUrls: ['../dist/assets/css/integrations.css', '../dist/assets/css/calendars.css']
})

export class CalendarListComponent {}
