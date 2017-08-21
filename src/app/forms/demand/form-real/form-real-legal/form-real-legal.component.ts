import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';
import { UserService } from '../../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-form-real-legal',
  templateUrl: './form-real-legal.component.html',
  styleUrls: ['./form-real-legal.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class FormRealLegalComponent implements OnInit {
  @Input() change: any;

    re: any;
    region: any;
    public result: any;
    value: any;
    valueOne: any;
    city: any;
    serch: any;
    serchFilter: any;
    PoNum: any = '';
    FirstName: any = '';
    LastName: any = '';
    FatherName: any = '';
    RequesterType: any = '0';
    Email: any = '';
    Address: any = '';
    IssuedFrom: any = '';
    Gender: any = '';
    MobileNo: any = '';
    BirthDate: any = '';
    PostNumber: any = '';
    ShomareShenasname: any = '';
    CityidLvlTwo: any;
    Cityid: any;
    FixedTel: any = '';
    city1: any;
    date: any;
    err: any;


    d: any;
    requesterId: any;

    JsonRow: any;
    AfterRow: any;
    JsonError: any;
    JsonErrorMessage: any;

    public formTaghazaRealLegal: FormGroup;
    constructor(
        private _service: NotificationsService,
        private fb: FormBuilder,
        calendar: NgbCalendar,
        config: NgbDatepickerConfig,
        public userservice: UserService,
    ) {
        // customize default values of datepickers used by this component tree
        config.minDate = {year: 1300, month: 1, day: 1};
        config.maxDate = {year: 1378, month: 12, day: 31};
        config.outsideDays = 'hidden';

            this.userservice.getcity().subscribe(
                post => {
                    this.region = post;
                    this.result = this.region.result;
                }
            );
    }
    setValue(value: string) {
        this.value = value;
        this.userservice.getcitylvl2(this.value).subscribe(
        post => {
            this.city1 = post;
            this.city = this.city1.result;
        }
        );
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
    ngOnInit() {
        this.formTaghazaRealLegal = this.fb.group({
            FormId: [1032],
            FirstName: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
            LastName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            NameManger: [null], // نام مدیر عامل
            submitNumber: [null], // شماره ثبت
            NationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            EconomicCode: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
            SubmitLocation: [null], // محل ثبت
            National: [null], // ملیت
            activity: [null], // زمینه فعالیت
            credit: this.fb.array([this.initItemRowsOne()]), // دارندگان امضاء مجاز
            BankProfile: this.fb.array([this.initItemRowsTwe()]),
        });
    }
    initItemRowsOne() {
        return this.fb.group({
            FirstName: new FormControl('', Validators.required),
            LastName: new FormControl('', Validators.required),
            FatherName: new FormControl('', Validators.required),
            shomareShenasname: new FormControl('', Validators.required),
            IssuedFrom: new FormControl('', Validators.required),
            Address: new FormControl('', Validators.required),
            PoNum: new FormControl('', Validators.required),
            NamaBar: new FormControl('', Validators.required), // نمابر
        });
    }
    initItemRowsTwe() {
        return this.fb.group({
            BankName: new FormControl('', Validators.required), // نام بانک
            beranchBank: new FormControl('', Validators.required), // شعیه
            beranchBankCode: new FormControl('', Validators.required), // کد شعبه
            Cvv: new FormControl('', Validators.required), // شماره حساب
        });
    }
    AddInitItemRowsOne() {
        const control = <FormArray>this.formTaghazaRealLegal.controls['credit'];
        control.push(this.initItemRowsOne());
    }
    RemoveInitItemRowsOne(i: number) {
        const control = <FormArray>this.formTaghazaRealLegal.controls['credit'];
        control.removeAt(i);
    }
    AddInitItemRowsTwe() {
        const control = <FormArray>this.formTaghazaRealLegal.controls['BankProfile'];
        control.push(this.initItemRowsTwe());
    }
    RemoveInitItemRowsTwe(i: number) {
        const control = <FormArray>this.formTaghazaRealLegal.controls['BankProfile'];
        control.removeAt(i);
    }

    sendFormTaghaza() {
        console.log(this.formTaghazaRealLegal);
        console.log(this.formTaghazaRealLegal.value);
    }
    SaveRequst() {
        const formObj = this.formTaghazaRealLegal.getRawValue();
        this.userservice.Saverequst(formObj).subscribe(
        res => {
            this.JsonRow = res;
            this.AfterRow = this.JsonRow.resultStatus;
            this.JsonError = this.JsonRow.error;
            this.JsonErrorMessage = this.JsonError.errorMessage;
            console.log(this.JsonErrorMessage);
            if (this.JsonRow.resultStatus === 200) {
            // this.disabledLink = false;
            // this.changeBool.emit(this.disabledLink);
            } else {
            // this.disabledLink = true;
            // this.changeBool.emit(this.disabledLink);
            }
            this.create();
        }
        );
    }
    resetForm() {
        localStorage.removeItem('test');
        // this.disabledLink = true;
        // this.changeBool.emit(this.disabledLink);
        this.formTaghazaRealLegal.reset();
    }
}
