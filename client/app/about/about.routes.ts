import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './../common/auth.service';

export const AboutRoutes = [
  {
    path: '',
    children: [
      { path: '', component: AboutComponent, canActivate: [AuthGuard]},
    ]
  }
];
