import { Component, Input } from '@angular/core';

@Component({
    selector: 'participant',
    template: `
	<div class="participant">
		<img src="{{external.pictureURL}}" alt="Guy Mortier">
		{{external.fname}} {{external.lname}}
	</div>
  `,
    styleUrls: ['../dist/assets/css/participant.css']
})

export class ParticipantComponent {
    @Input()
    private external: any;
}
