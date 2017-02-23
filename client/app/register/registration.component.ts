import { Component } from '@angular/core';

@Component({
  selector: 'registration-form',
  template: `
  <h1 class="form-title">Registration</h1>
  <div class="step current-step"></div>
  <div class="step"></div>
  <h2 class="form-subtitle">Step 1 - Credentials</h2>
  <form>
      <input type="text" id="email" placeholder="EMAIL" autofocus />
      <input type="password" id="password" placeholder="PASSWORD" />
      <div id="rating"></div>
      <input type="password" id="repeat-password" placeholder="REPEAT PASSWORD" />
      <button type="submit">NEXT</button>
  </form>
  `,
  styleUrls: ['../dist/assets/css/registration-form.css']
})

export class RegistrationComponent {}
