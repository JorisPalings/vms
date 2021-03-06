import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ModalModule } from 'ngx-modal';

// Validators
import { EqualValidator } from './directives/equal-validator.directive';

// Services
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { MeetingService } from './shared/services/meeting.service';
import { UserService } from './shared/services/user.service';
import { ProjectService } from './shared/services/project.service';
import { LoadingService } from './shared/services/loading.service';

// Components
import { appRouting } from './app.routing';
import { LandingComponent } from './landing/landing.component';
import { PrivateDashboardComponent } from './private_dashboard/private_dashboard.component';
import { PublicDashboardComponent } from './public_dashboard/public_dashboard.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './register/registration.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from './settings/feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './landing/login.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { ParticipantComponent } from './meeting-details/participant.component';
import { ProjectsComponent } from './projects/projects.component';
import { TimelineComponent } from './shared/timeline.component';
import { MeetingComponent } from './shared/meeting.component';
import { DropdownComponent } from './shared/dropdown.component';
import { BrandingComponent } from './shared/branding.component';
import { ProfileComponent } from './shared/profile.component';
import { ClockComponent } from './public_dashboard/clock.component';
import { IntegrationButtonsComponent } from './shared/integration-buttons.component';

@NgModule ({
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    EqualValidator,
    LandingComponent,
    PrivateDashboardComponent,
    PublicDashboardComponent,
    RegisterComponent,
    RegistrationComponent,
    IntegrationsComponent,
    CalendarsComponent,
    SettingsComponent,
    FeedbackComponent,
    NotFoundComponent,
    LoginComponent,
    BrandingComponent,
    MeetingComponent,
    MeetingDetailsComponent,
    ParticipantComponent,
    ProjectsComponent,
    TimelineComponent,
    DropdownComponent,
    ProfileComponent,
    ClockComponent,
    IntegrationButtonsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ CookieService, AuthenticationService, MeetingService, UserService, ProjectService, LoadingService ]
})

export class AppModule {}
