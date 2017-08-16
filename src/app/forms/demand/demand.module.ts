import { NgModule , ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EJAngular2Module } from 'ej-angular2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IntegrationComponent } from './integration/integration.component';

import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdRadioModule,
  MdCheckboxModule,
  MdButtonModule,
  MdProgressBarModule,
  MdToolbarModule,
  MdSelectModule,
  MdDatepickerModule,
  MdDialogModule,
  MdNativeDateModule } from '@angular/material';

import { DemandRoutes } from './demand.routing';

import { DemandComponent } from './demand.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { SubmitDemandComponent } from './submit-demand/submit-demand.component';
import { FormRealComponent } from './form-real/form-real.component';
import { FormLegalComponent } from './form-legal/form-legal.component';
import { FormRealLegalComponent } from './form-real/form-real-legal/form-real-legal.component';

import { ExistingDivisionsComponent } from './existing-divisions/existing-divisions.component';

import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { PowerShiftComponent } from './power-shift/power-shift.component';
import { IntegrationSeparationComponent } from './integration-separation/integration-separation.component';
import { BecomePermanentComponent } from './become-permanent/become-permanent.component';
import { ChangeTariffComponent } from './change-tariff/change-tariff.component';
import { ChangeOwnerComponent } from './change-owner/change-owner.component';

import { BranchingAddressComponent } from './branching-address/branching-address.component';

import { OperationComponent } from './operation/operation.component';
import { TasksComponent } from './operation/tasks/tasks.component';
import { SplitTasksComponent } from './operation/split-tasks/split-tasks.component';
import { NewDemandComponent} from './new-demand/new-demand.component';

import { EditNewDemandComponent } from './new-demand/edit-new-demand.component';
import { SubmitLicenseComponent } from './submit-license/submit-license.component';
import { SendDocumentsComponent  } from './send-documents/send-documents.component';
import { Ng2TableModule } from './data-grid/components/ng-table-module';

import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AlertCenterModule } from './../../../../node_modules/ng2-alert-center/alert-center/alert-center.module';
@NgModule({
  imports: [
    SimpleNotificationsModule.forRoot(),
    Ng2TableModule,
    CommonModule,
    RouterModule.forChild(DemandRoutes),
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    EJAngular2Module.forRoot(),
    HttpModule,
    NgbModule.forRoot(),
    FileUploadModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdButtonModule,
    MdProgressBarModule,
    MdToolbarModule,
    MdSelectModule,
    MdDatepickerModule,
    MdDialogModule,
    MdNativeDateModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    DemandComponent,
    ApplicantListComponent,
    FormRealComponent,
    FormRealLegalComponent,
    FormLegalComponent,
    ExistingDivisionsComponent,

    OperationComponent,
    SplitTasksComponent,
    TasksComponent,

    SubmitDemandComponent,
    FormWizardComponent,
    PowerShiftComponent,
    IntegrationSeparationComponent,
    IntegrationComponent,
    
    BecomePermanentComponent,
    ChangeTariffComponent,
    ChangeOwnerComponent,

    NewDemandComponent,
    EditNewDemandComponent,

    SubmitLicenseComponent,
    SendDocumentsComponent,
    BranchingAddressComponent
  ],
})

export class DemandModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
    };
  }
}
