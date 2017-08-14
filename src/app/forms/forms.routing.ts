import { Routes } from '@angular/router';

import { FormsComponent } from './forms.component';

// import { SubmitDemandComponent } from './submit-demand/submit-demand.component';

export const FormRoutes: Routes = [
  {
    path: '',
    component: FormsComponent, 
    children: [{
      path: 'demand',
      loadChildren: './demand/demand.module#DemandModule'
    },
    //  {
    //   path: 'formTaghaza',
    //   component: FormTaghazaComponent
    // },

  ]}
];
