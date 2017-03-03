import { Component } from '@angular/core';

@Component({
    selector: 'projects',
    template: `
    <header class="private-dash-header">
        <branding></branding>
        <div class="title">
          <a routerLink="/private-dashboard"><i class="fa fa-chevron-left"></i></a>
          <h1>Projects</h1>
        </div>
        <profile></profile>
    </header>
    <main>
        <div class="container">
            <ul>
                <li>
                    <h2>VMS</h2>
                    <ul class="notes-list">
                        <li>
                            Sun Mar 05 2017, 10:00 - 12:00
                        </li>
                        <li>
                            Mon Mar 06 2017, 11:30 - 12:00
                        </li>
                        <li>
                            Tue Mar 07 2017, 16:30 - 16:45
                        </li>
                    </ul>
                </li>
                <li>
                    <h2>Pepper</h2>
                    <ul class="notes-list">
                        <li>
                            Sun Mar 05 2017, 9:30 - 10:00
                        </li>
                        <li>
                            Wed Mar 08 2017, 13:00 - 14:00
                        </li>
                        <li>
                            Fri Mar 10 2017, 10:00 - 11:00
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </main>
    `,
    styleUrls: ['../dist/assets/css/projects.css']
})

export class ProjectsComponent {}
