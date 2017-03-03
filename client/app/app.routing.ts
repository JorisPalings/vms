import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrivateDashboardComponent } from './private_dashboard/private_dashboard.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { PublicDashboardComponent } from './public_dashboard/public_dashboard.component';
import { RegisterComponent } from './register/register.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes : Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'integrations',
    component: IntegrationsComponent
  },
  {
    path: 'calendars',
    component: CalendarsComponent
  },
  {
    path: 'private-dashboard',
    component: PrivateDashboardComponent
  },
  {
    path: 'meeting',
    component: MeetingDetailsComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'public-dashboard',
    component: PublicDashboardComponent
  },
  {
    path: 'meeting/:id',
    component: MeetingDetailsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const appRouting : ModuleWithProviders = RouterModule.forRoot(appRoutes);
