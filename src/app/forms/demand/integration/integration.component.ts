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
    constructor(
        private http: Http,
        public userservice: UserService,
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit() {
        this.Integration = this.fb.group({
            SourceBranchCode: [null , Validators.compose([Validators.required])],
            requesterId: [null],
            FormId: [1023],
            TrfType: [null, Validators.compose([Validators.required])], // نوع انشعاب
            Phs: [null, Validators.compose([Validators.required])], // فاز
            Amp: [null, Validators.compose([Validators.required])],// آمپر
            TrfHCode: [null, Validators.compose([Validators.required])], //سر تعرفه 
            PwrCnt: [null, Validators.compose([Validators.required])],// قدرت قرار دادی
            PwrIcn: [null, Validators.compose([Validators.required])],// قدرت مجاز پروانه
            FmlCode: [null, Validators.compose([Validators.required])],// تعداد خانوار
            TrfDetailCode: [null, Validators.compose([Validators.required])],//  dsadasdad
            Dm: this.fb.array([this.initItemRows()]),
        });
    }
    initItemRows() {
        return this.fb.group({
            Count: [],
            Phs: [],
            Amp: [],
            TrfHCode: [],
            PwrCnt: [],
            PwrIcn: [],
            TrfType: [],
            FmlCode: [],
            BranchTypeCode: [],
            VoltCode: [],
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
}
