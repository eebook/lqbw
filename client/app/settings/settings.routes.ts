import { AuthGuard } from './../common/auth.service';
import { SettingsComponent } from './settings.component';

import { RouterModule } from '@angular/router';

// TODO, move to a module

export const settingsRoutes = [
  {
    path: '',
    children: [
      { path: '', component: SettingsComponent, canActivate: [AuthGuard]},
    ]
  }
];
