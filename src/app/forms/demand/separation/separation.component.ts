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
  selector: 'app-separation',
  templateUrl: './separation.component.html',
  styleUrls: ['./separation.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class SeparationComponent implements OnInit {
    public Separation: FormGroup;

    BranchCodeView: any = '';
    serchFilter: any;
    serchFilip: any;
    serch: any;
    FirstName: any = '';
    LastName: any = '';
    PhoneNumber: any = '';
    Address: any = '';
    CityId: any = '';
    CityName: any = '';
    WorkDayCode: any = '';
    RdrCode: any = '';
    RdgSrl: any = '';
    BranchSrl: any = '';
    Phs: any = '';
    Amp: any = '';
    TrfCode: any = '';
    PwrCnt: any = '';
    BranchCode: any = '';
    RegionId: any = '';
    RegionName: any = '';
    BillId: any = '';
    CreationDate: any = '';
    id: any;
    VillageCode: any = '';
    databind: any[] = [];
    FileNumber: any = '';
    FullName: any = '';
    CityNameID: any = '';
    RegionNameID: any = '';
    VillageName: any = '';

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
    // onEnter(searchTerm: string) {
    //     this.serchFilter = searchTerm;
    //     this.userservice.serachByPassExisting(this.serchFilter).subscribe(
    //         post => {
    //             this.JsonRow = post;
    //             this.JsonError = this.JsonRow.error;
    //             this.JsonErrorMessage = this.JsonError.errorMessage;
    //             console.log(this.JsonRow);
    //             if (this.JsonRow.resultStatus === 200) {
    //             this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
    //             // this.FirstName = this.serch['firstName'];
    //             // this.LastName = this.serch['lastName'];
    //             this.PhoneNumber = this.serch['phoneNumber'];
    //             this.Address = this.serch['address'];
    //             this.BranchSrl = this.serch['branchSrl'];
    //             this.Phs = this.serch['phs'];
    //             this.Amp = this.serch['amp'];
    //             this.TrfCode = this.serch['trfCode'];
    //             this.PwrCnt = this.serch['pwrCnt'];
    //             this.BranchCode = this.serch['branchCode'];
    //             this.CityNameID = this.serch['cityName'] + '(' + this.serch['cityId'] + ')';
    //             this.RegionNameID = this.serch['regionName'] + '(' + this.serch['regionId'] + ')';
    //             // tslint:disable-next-line:max-line-length
    //             this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
    //             this.FullName = this.serch['firstName'] + this.serch['lastName'];
    //             this.VillageCode = this.serch['villageCode'];
    //             this.BranchCodeView = this.serch['branchCode'];
    //             // this.BillId = this.serch['BillId'];
    //             // this.CreationDate = this.serch['creationDate'];
    //             // console.log(this.databind);
    //             } else {
    //             this.Separation.reset();
    //             }
    //             // this.getdata(this.JsonRow);
    //             this.create();
    //         }
    //     );
    // }
    // serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    //     this.serchFilter = searchTerm.value;
    //     this.userservice.serachByPassExisting(this.serchFilter).subscribe(
    //         post => {
    //         this.JsonRow = post;
    //         this.JsonError = this.JsonRow.error;
    //         this.JsonErrorMessage = this.JsonError.errorMessage;
    //         console.log(this.JsonRow.result);
    //         if (this.JsonRow.resultStatus === 200) {
    //             this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
    //             // this.FirstName = this.serch['firstName'];
    //             // this.LastName = this.serch['lastName'];
    //             this.PhoneNumber = this.serch['phoneNumber'];
    //             this.Address = this.serch['address'];
    //             this.BranchSrl = this.serch['branchSrl'];
    //             this.Phs = this.serch['phs'];
    //             this.Amp = this.serch['amp'];
    //             this.TrfCode = this.serch['trfCode'];
    //             this.PwrCnt = this.serch['pwrCnt'];
    //             this.BranchCode = this.serch['branchCode'];
    //             this.BranchCodeView = this.serch['branchCode'];
    //             this.CityNameID = this.serch['cityName'] + '(' + this.serch['cityId'] + ')';
    //             this.RegionNameID = this.serch['regionName'] + '(' + this.serch['regionId'] + ')';
    //             // tslint:disable-next-line:max-line-length
    //             this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
    //             this.FullName = this.serch['firstName'] + this.serch['lastName'];
    //             this.VillageCode = this.serch['villageCode'];

    //             // this.BranchCodeView = this.serch['branchCode'];
    //             // this.BillId = this.serch['BillId'];
    //             // this.CreationDate = this.serch['creationDate'];
    //             // console.log(this.databind);
    //             console.log(this.JsonRow.result);
    //         } else {
    //             this.Separation.reset();
    //         }
    //         this.getdata(this.JsonRow.result);
    //         this.create();
    //         }
    //     );
    // }
    public ngOnInit() {
        this.Separation = this.fb.group({
            DistinationBranchcode: [],   //   لیستی از رمز ها
            FormId: [1022],
            requesterId: [2],
            BranchCode: [],
            Phs: [null , Validators.compose([Validators.required])],
            Amp: [null , Validators.compose([Validators.required])],
            TrfType: [null , Validators.compose([Validators.required])],
            TrfHCode: [null , Validators.compose([Validators.required])],
            TrfDetailCode: [null, Validators.compose([Validators.required])],
            PwrCnt: [null , Validators.compose([Validators.required])],
            PwrIcn: [null , Validators.compose([Validators.required])],
            FmlCode: [null , Validators.compose([Validators.required])],
            // BranchTypeCode: [null , Validators.compose([Validators.required])],
            VoltCode: [null , Validators.compose([Validators.required])],
        });
    }


    t1: any;
    t2: any;
    list: any[];

    addList() {
        console.log(this.Separation.value);
        this.t1 = this.Separation.value;
        console.log(this.t1);
        let SeparationSend = [];
        let Separation = [];
        Separation = JSON.parse(localStorage.getItem('Separation'));
        if (Separation != null) {
          SeparationSend = JSON.parse(localStorage.getItem('Separation'));
        }
        const SeparationData: any = this.t1;
        // console.log([exist]);
        SeparationSend.push(SeparationData);
        localStorage.setItem('Separation', JSON.stringify( SeparationSend ));
        this.list = JSON.parse( localStorage.getItem('Separation'));
        console.log(this.list);
    }
    // SendSaveRequst() {
    //     // tslint:disable-next-line:no-unused-expression
    //     this.Separation.value;
    //     console.log(this.Separation.value);
    //     // tslint:disable-next-line:no-unused-expression
    //     this.t1 = this.Separation.value;
    //     let listData = [];
    //     listData.push(this.t1);
    //     console.log(listData);
    // }
    SaveRequst() {
        const formObj = this.Separation.getRawValue();
        console.log(formObj);
        this.userservice.Separation(formObj).subscribe(
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