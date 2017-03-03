import { Input, OnInit, OnDestroy, Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { AuthenticationService } from '../shared/services/authentication.service';

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
    @Input('callback')
    callback: string;
    googleAuthenticated: boolean;
    linkedInAuthenticated: boolean;

    private googleURL = 'http://localhost:4000/auth/google';
    private linkedinURL = 'http://localhost:4000/auth/linkedin';

    constructor(private activatedRoute: ActivatedRoute, private cookieService:CookieService, private router:Router, private authenticationService:AuthenticationService) {}

    ngOnInit() {
        this.authenticationService.integrations().subscribe(data => {
            var integrations = data.integrations;
            for(var i = 0; i < integrations.length; i++) {
                if(integrations[i] === 'google-login') {
                    this.googleAuthenticated = true;
                } else if(integrations[i] === 'linkedin-login') {
                    this.linkedInAuthenticated = true;
                }
            }
        });
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            //let success = params['success'];
            let callbackParam = params['callback'];
            /*if(success){
                if(success == 'linkedin'){
                    this.cookieService.put('LinkedInAuthenticated', 'true');
                    this.linkedInAuthenticated = true;
                } else if(success == 'google'){
                    this.cookieService.put('GoogleAuthenticated', 'true');
                    this.googleAuthenticated = true;
                }
            }*/
            if(callbackParam) {
                if(callbackParam === 'settings') {
                    this.router.navigate(['/settings']);
                }
            }
        });
    }

    authenticateWithGoogle(event) {
        //Prevents button from submitting form
        event.preventDefault();
        window.location.href = this.googleURL + '?callback=' + this.callback + "&id=" + this.authenticationService.getId();
    }

    authenticateWithLinkedin(event) {
        //Prevents button from submitting form
        event.preventDefault();
        window.location.href = this.linkedinURL + '?callback=' + this.callback + "&id=" + this.authenticationService.getId();
    }
}
