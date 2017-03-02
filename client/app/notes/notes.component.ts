import { Component } from '@angular/core';

@Component({
    selector: 'notes',
    template: `
    <header class="private-dash-header">
        <branding></branding>
        <div class="title">
          <a routerLink="/private-dashboard"><i class="fa fa-chevron-left"></i></a>
          <h1>Notes</h1>
        </div>
        <profile></profile>
    </header>
    <main>
        <div class="container">
            <h2>Notes</h2>
        </div>
    </main>
    `,
    styleUrls: ['../dist/assets/css/notes.css']
})

export class NotesComponent {}
