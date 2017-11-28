import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchtmpComponent } from './containers/search/search.component';

export const searchRoutes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'find',
    component: SearchtmpComponent
  }
];
