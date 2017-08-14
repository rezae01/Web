import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EJAngular2Module } from 'ej-angular2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
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

import { ExistingDivisionsComponent } from './existing-divisions/existing-divisions.component';

import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { PowerShiftComponent } from './power-shift/power-shift.component';
import { IntegrationSeparationComponent } from './integration-separation/integration-separation.component';
import { BecomePermanentComponent } from './become-permanent/become-permanent.component';
import { ChangeTariffComponent } from './change-tariff/change-tariff.component';
import { ChangeOwnerComponent } from './change-owner/change-owner.component';
import { OperationComponent } from './operation/operation.component';

import { NewDemandComponent} from './new-demand/new-demand.component';
import { SubmitLicenseComponent } from './submit-license/submit-license.component';
import { SendDocumentsComponent } from './send-documents/send-documents.component';

@NgModule({
  imports: [
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
    MdNativeDateModule
  ],
  declarations: [
    DemandComponent,
    ApplicantListComponent,
    FormRealComponent,
    FormLegalComponent,
    ExistingDivisionsComponent,
    OperationComponent,
    SubmitDemandComponent,
    FormWizardComponent,
    PowerShiftComponent,
    IntegrationSeparationComponent,
    BecomePermanentComponent,
    ChangeTariffComponent,
    ChangeOwnerComponent,
    NewDemandComponent,
    SubmitLicenseComponent,
    SendDocumentsComponent,

  ]
})

export class DemandModule {}
