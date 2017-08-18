import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { NotificationsService } from 'angular2-notifications';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

import { Task } from '../../demand/model/task';
declare var $: any;
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class IntegrationComponent implements OnInit {
    public Integration: FormGroup;


    JsonRow: any;
    AfterRow: any;
    JsonError: any;
    JsonErrorMessage: any;
    constructor(
        private http: Http,
        public userservice: UserService,
        private fb: FormBuilder,
        private _service: NotificationsService,
    ) {

    }
    create() {
        if (this.JsonRow.resultStatus === 200) {
          this._service.success(
              'کاربر گرامی',
              this.JsonErrorMessage,
              {
                  showProgressBar: true,
                  pauseOnHover: true,
                  clickToClose: true,
                  maxLength: 200
              }
          );
        } else if (this.JsonRow.resultStatus === 400) {
          this._service.error(
              'کاربر گرامی',
              this.JsonErrorMessage,
              {
                  showProgressBar: true,
                  pauseOnHover: true,
                  clickToClose: true,
                  maxLength: 200
              }
          );
        } else if (this.JsonRow.resultStatus === 300) {
          this._service.warn(
              'کاربر گرامی',
              this.JsonErrorMessage,
              {
                  showProgressBar: true,
                  pauseOnHover: true,
                  clickToClose: true,
                  maxLength: 200
              }
          );
        }
      }
    public ngOnInit() {
        this.Integration = this.fb.group({
            SourceBranchCode: [null , Validators.compose([Validators.required])],
            requesterId: [null, Validators.compose([Validators.required])],
            FormId: [1023],
            TrfType: [null, Validators.compose([Validators.required])], // نوع انشعاب
            Phs: [null, Validators.compose([Validators.required])], // فاز
            Amp: [null, Validators.compose([Validators.required])], // آمپر
            TrfHCode: [null, Validators.compose([Validators.required])], // سر تعرفه 
            PwrCnt: [null, Validators.compose([Validators.required])], // قدرت قرار دادی
            PwrIcn: [null, Validators.compose([Validators.required])], // قدرت مجاز پروانه
            FmlCode: [null, Validators.compose([Validators.required])], // تعداد خانوار
            Dm: this.fb.array([this.initItemRows()]),
        });
    }
    initItemRows() {
        return this.fb.group({
            TrfDetailCode: [null, Validators.compose([Validators.required])],
            Count: [null, Validators.compose([Validators.required])],
            Phs: [null, Validators.compose([Validators.required])],
            Amp: [null, Validators.compose([Validators.required])],
            TrfHCode: [null, Validators.compose([Validators.required])],
            PwrCnt: [null, Validators.compose([Validators.required])],
            PwrIcn: [null, Validators.compose([Validators.required])],
            TrfType: [null, Validators.compose([Validators.required])],
            FmlCode: [null, Validators.compose([Validators.required])],
            BranchTypeCode: [null, Validators.compose([Validators.required])],
            VoltCode: [null, Validators.compose([Validators.required])],
        });
    }
    AddIntegration() {
        const control = <FormArray>this.Integration.controls['Dm'];
        control.push(this.initItemRows());
    }
    RemoveIntegration(i: number) {
    const control = <FormArray>this.Integration.controls['Dm'];
    control.removeAt(i);
    }


    SaveRequst() {
        const formObj = this.Integration.getRawValue();
        console.log(formObj);
        this.userservice.Saverequst(formObj).subscribe(
          res => {
            this.JsonRow = res;
            this.AfterRow = this.JsonRow.resultStatus;
            this.JsonError = this.JsonRow.error;
            this.JsonErrorMessage = this.JsonError.errorMessage;

            this.create();
          }
        );
      }
}
