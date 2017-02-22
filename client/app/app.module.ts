import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { LandingComponent } from './landing/landing.component';
import { PrivateDashboardComponent } from './private_dashboard/private_dashboard.component';
import { PublicDashboardComponent } from './public_dashboard/public_dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './landing/login.component';


@NgModule ({
  imports: [
    BrowserModule,
    appRouting
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    PrivateDashboardComponent,
    PublicDashboardComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
