import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';


export const appRoutes = [
    {
        path: 'register',
        component: UserRegisterComponent
    }
];
