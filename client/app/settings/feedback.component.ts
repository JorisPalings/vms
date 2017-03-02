import { Component } from '@angular/core';

@Component({
  selector: 'feedback',
  template: `
  <div class="feedback">
    <i class="fa fa-check"></i> <span>Your changes have been saved!</span>
  </div>
  `,
  styleUrls: ['../dist/assets/css/settings.css']
})

export class FeedbackComponent {}
