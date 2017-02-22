import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
  <div class="form">
    <h1 class="form-title">Login</h1>
    <form>
        <input type="text" placeholder="EMAIL" autofocus />
        <input type="password" placeholder="PASSWORD" />
        <span class="form-instruction"><a href="#">Forgot your password?</a></span>
        <button type="submit">LOG IN</button>
        <span class="form-instruction">Need an account? <a href="#">Register</a></span>
    </form>
  </div>
  `,
  styleUrls: ['../dist/assets/css/login-form.css']
})

export class LoginComponent {}
