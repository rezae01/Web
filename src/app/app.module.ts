import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';


import { SimpleNotificationsModule } from 'angular2-notifications';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AuthGuard} from './_GURD/auth.guard';
import {LoginComponent} from './login/login.component';
// import { JazzDialogComponent } from './material/dialog/dialog.component';
import { CalendarDialogComponent } from './apps/fullcalendar/fullcalendar.component';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
// import { WizardComponent } from './component/wizard/wizard.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    // JazzDialogComponent,
    CalendarDialogComponent,
    // WizardComponent,

  ],
  imports: [
    SimpleNotificationsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [AuthGuard],
  entryComponents: [
    //  JazzDialogComponent,
      CalendarDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
