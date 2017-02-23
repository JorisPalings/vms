import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrivateDashboardComponent } from './private_dashboard/private_dashboard.component';
import { PublicDashboardComponent } from './public_dashboard/public_dashboard.component';
import { RegisterComponent } from './register/register.component';
import { IntegrationsComponent } from './integrations/integrations.component';
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
    path: 'private-dashboard',
    component: PrivateDashboardComponent
  },
  {
    path: 'public-dashboard',
    component: PublicDashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const appRouting : ModuleWithProviders = RouterModule.forRoot(appRoutes);
