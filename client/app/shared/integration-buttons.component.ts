import { OnInit, OnDestroy, Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'integration-buttons',
    template: `
  <button class="integration-button google" [disabled]="googleAuthenticated" [ngClass]="{'linked no-hover': googleAuthenticated}" (click)="authenticateWithGoogle($event)">Google <i class="fa fa-check" [hidden]="!googleAuthenticated" aria-hidden="true"></i></button>
  <button class="integration-button linkedin" [disabled]="linkedInAuthenticated" [ngClass]="{'linked no-hover': linkedInAuthenticated}" (click)="authenticateWithLinkedin($event)">LinkedIn <i class="fa fa-check" [hidden]="!linkedInAuthenticated" aria-hidden="true"></i></button>
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
            let success = params['success'];
            if(success){
                if(success == 'linkedin'){
                    this.cookieService.put('LinkedInAuthenticated', 'true');
                    this.linkedInAuthenticated = true;
                } else if(success == 'google'){
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
