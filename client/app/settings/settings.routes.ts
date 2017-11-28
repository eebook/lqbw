import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './../common/auth.service';

export const settingsRoutes = [
  {
    path: '',
    children: [
      { path: '', component: SettingsComponent, canActivate: [AuthGuard]},
    ]
  }
];
