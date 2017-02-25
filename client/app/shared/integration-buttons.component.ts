import { OnInit, OnDestroy, Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'integration-buttons',
    template: `
  <button class="integration-button google" [ngClass]="{'linked': googleAuthenticated}" (click)="authenticateWithGoogle($event)">Google</button>
  <button class="integration-button linkedin" [ngClass]="{'linked': linkedInAuthenticated}" (click)="authenticateWithLinkedin($event)">LinkedIn</button>
  `,
    styleUrls: ['../dist/assets/css/integrations.css'],
    providers: [ CookieService ]
})

export class IntegrationButtonsComponent implements OnInit {
    googleAuthenticated: boolean;
    linkedInAuthenticated: boolean;

    private googleURL = 'http://localhost:4000/auth/google';
    private linkedinURL = 'http://localhost:4000/auth/linkedin';

    constructor(private activatedRoute: ActivatedRoute, private cookieService:CookieService) {
        if(this.cookieService.get('LinkedInAuthenticated') === 'true'){
            this.linkedInAuthenticated = true;
        }
        if(this.cookieService.get('GoogleAuthenticated') === 'true'){
            this.googleAuthenticated = true;
        }
    }

    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let code = params['code'];
            let state = params['state'];
            if(code){
                if(state){
                    this.cookieService.put('LinkedInAuthenticated', 'true');
                    this.linkedInAuthenticated = true;
                } else {
                    this.cookieService.put('GoogleAuthenticated', 'true');
                    this.googleAuthenticated = true;
                }
            }
        });
    }

    authenticateWithGoogle(event) {
        //Prevents button from submitting form
        event.preventDefault();
        window.location.href = this.googleURL;
    }

    authenticateWithLinkedin(event) {
        //Prevents button from submitting form
        event.preventDefault();
        window.location.href = this.linkedinURL;
    }
}
