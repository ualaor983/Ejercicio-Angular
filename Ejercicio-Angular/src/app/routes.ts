import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Terraria items',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Item details',
  },
];

export default routeConfig;
