import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EJAngular2Module } from 'ej-angular2';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TreeModule } from 'angular-tree-component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormRoutes } from './forms.routing';

import { FormsComponent } from './forms.component';
// import { SubmitDemandComponent } from './submit-demand/submit-demand.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormRoutes),
    // MdCardModule,
    // MdIconModule,
    // MdInputModule,
    // MdRadioModule,
    // MdButtonModule,
    // MdProgressBarModule,
    // MdToolbarModule,
    // MdSelectModule,
    // MdDatepickerModule,
    // MdNativeDateModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TreeModule,
    EJAngular2Module.forRoot(),
    HttpModule,
    NgbModule.forRoot()
  ],
  declarations: [
    FormsComponent,
    // SubmitDemandComponent,
  
  ]
})

export class FormModule {}
