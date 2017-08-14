import { Routes } from '@angular/router';

import { DemandComponent } from './demand.component';

import { SubmitDemandComponent } from './submit-demand/submit-demand.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { ChangeOwnerComponent } from './change-owner/change-owner.component';
import { PowerShiftComponent } from './power-shift/power-shift.component';
import { IntegrationSeparationComponent } from './integration-separation/integration-separation.component';
import { BecomePermanentComponent } from './become-permanent/become-permanent.component';
import { ChangeTariffComponent } from './change-tariff/change-tariff.component';
export const DemandRoutes: Routes = [
  {
    path: '',
    component: DemandComponent,
    children: [
      {
        path: 'SubmitDemand',
        component: SubmitDemandComponent,
      },
      {
        path: 'ApplicantList',
        component: ApplicantListComponent,
      }, {
        path: 'NewDemand',
        component: FormWizardComponent,
      }, {
        path: 'ChangeOwner',
        component: ChangeOwnerComponent,
      }, {
        path: 'PowerShift',
        component: PowerShiftComponent,
      }, {
        path: 'IntegrationSeparation',
        component: IntegrationSeparationComponent,
      }, {
        path: 'BecomePermanent',
        component: BecomePermanentComponent,
      }, {
        path: 'ChangeTariff',
        component: ChangeTariffComponent,
      }
  ]
}
];
