import { Routes } from '@angular/router';
import { EstilosPage } from './features/estilos-page/estilos-page';
import { DaisyuiPage } from './features/daisyui-page/daisyui-page';
import { SimpsonsPage } from './features/simpsons-page/simpsons-page';
import { SimpsonsDetail } from './features/simpsons-page/components/simpsons-detail/simpsons-detail';

export const routes: Routes = [
  {
    path: '',
    component:DaisyuiPage,
  },
  {
    path: 'estilos-page',
    component:EstilosPage,
  },
  {
    path: 'simpson-page'
    ,component: SimpsonsPage,
  },{
    path: 'simpson-page/:id',
    component: SimpsonsDetail
  }
  
];
