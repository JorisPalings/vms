import { Component } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';

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
            <div class="row">
                <div class="three columns">
                    <ul class="projects-list">
                        <li *ngFor="let project of projects">
                            <h2>{{project.tag}}</h2>
                        </li>
                    </ul>
                </div>
                <div class="nine columns">
                    <ul class="meetings-list">
                        <li>
                            <ul class="meeting-item">
                                <li><i class="fa fa-fw fa-calendar"></i>Sun Mar 05 2017, 10:00 - 12:00</li>
                                <li><i class="fa fa-fw fa-users"></i>Guy Mortier, Sander Lenaerts, Nick Van Vynckt</li>
                                <li><i class="fa fa-fw fa-map-marker"></i>Everest</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="meeting-item">
                                <li><i class="fa fa-fw fa-calendar"></i>Mon Mar 06 2017, 11:30 - 12:00</li>
                                <li><i class="fa fa-fw fa-users"></i>Bert Vandormael</li>
                                <li><i class="fa fa-fw fa-map-marker"></i>Ben Nevis</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="meeting-item">
                                <li><i class="fa fa-fw fa-calendar"></i>Tue Mar 07 2017, 16:30 - 16:45</li>
                                <li><i class="fa fa-fw fa-calendar"></i>Jan Janssens, Peter Peeters</li>
                                <li><i class="fa fa-fw fa-map-marker"></i>Mont Blanc</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
    `,
    styleUrls: ['../dist/assets/css/projects.css']
})

export class ProjectsComponent {

    private projects: any[] = [];

    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.getAllProjects().subscribe(data => {
            this.projects = data;
        });
    }

}
