import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-form-real',
  templateUrl: './form-real.component.html',
  styleUrls: ['./form-real.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class FormRealComponent implements OnInit {
  // @Input() change: any;


  cityValParent: any;
  cityValChild: any;

  regionValParent: any;
  regionValChild: any;

  value: any;

  searchContainer: any;
  searchFilter: any;


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

  private today: NgbDateStruct;


  model;
  d: any;
  requesterId: any;





  @Input() disabledLink: boolean;
  @Output() changeBool = new EventEmitter;
  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  public formTaghaza: FormGroup;
  constructor(
    private _service: NotificationsService,
    private fb: FormBuilder,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    public userservice: UserService,
  ) {
    config.minDate = {year: 1300, month: 1, day: 1};
    config.maxDate = {year: 1378, month: 12, day: 31};
    config.outsideDays = 'hidden';
    this.userservice.getcity().subscribe(
      post => {
        this.regionValParent = post;
        this.regionValChild = this.regionValParent.result;

      }
    );
  }
  setValue(value: string) {
    this.value = value;
    this.userservice.getcitylvl2(this.value).subscribe(
      post => {
        this.cityValParent = post;
        this.cityValChild = this.cityValParent.result;
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
    this.formTaghaza = this.fb.group({
      FormId: [1032],
      NationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      FirstName: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
      LastName: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      FatherName: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
      RequesterType: [0],
      Email: [null, Validators.compose([CustomValidators.email, Validators.maxLength(40)])],
      shomareShenasname: [null, Validators.compose([Validators.maxLength(12)])],
      IssuedFrom: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      Gender: [null, Validators.compose([Validators.required])],
      MobileNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      BirthDate: [null, Validators.compose([Validators.required])],
      PoNum: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      Adress: [null, Validators.compose([Validators.required, Validators.maxLength(1024)])],
      Cityid: ['', Validators.compose([Validators.required])],
      CityidLvlTwo: [''],
      FixedTel: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      // legalRepresentative: this.fb.group({
      //   NationalCode: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      //   FirstName: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      //   CompanyType: ['', Validators.compose([Validators.required])],
      //   RequesterType: [1],
      //   Email: [null, Validators.compose([CustomValidators.email, Validators.maxLength(40)])],
      //   PoNum: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      //   Adress: [null, Validators.compose([Validators.required, Validators.maxLength(1024)])],
      //   Cityid: [null, Validators.compose([Validators.required])],
      //   CityidLvlTwo: [null],
      //   FixedTel: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      //   MobileNo: [null, Validators.compose([Validators.minLength(8), Validators.maxLength(11)])],
      // }),
    });
  }

  onEnter(searchTerm: string) {
    this.searchFilter = searchTerm;
    this.userservice.serachByNationalCode(this.searchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          // Start Access Level
          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);
          // End Access Level
          this.searchContainer = JSON.parse( JSON.stringify(this.JsonRow.result));
          this.requesterId = this.searchContainer['requesterId'];
          localStorage.setItem('requesterId', this.requesterId);
          this.d = localStorage.getItem('requesterId');
          this.FirstName = this.searchContainer['firstName'];
          this.LastName = this.searchContainer['lastName'];
          this.FatherName = this.searchContainer['fatherName'];
          this.RequesterType = this.searchContainer['requesterType'];
          this.Email = this.searchContainer['email'];
          this.ShomareShenasname = this.searchContainer['shomareShenasname'];
          this.IssuedFrom = this.searchContainer['issuedFrom'];
          this.Gender = this.searchContainer['gender'];
          this.MobileNo = this.searchContainer['mobileNo'];
          this.BirthDate = this.searchContainer['birthDate'];
          this.PoNum = this.searchContainer['poNum'];
          this.Address = this.searchContainer['adress'];
          this.CityidLvlTwo = this.searchContainer['cityidRealLvl'];
          this.Cityid = this.searchContainer['cityid'];
          this.FixedTel = this.searchContainer['fixedTel'];
        } else {
          // Start Access Level
          this.disabledLink = true;
          this.changeBool.emit(this.disabledLink);
          // End Access Level

          this.formTaghaza.reset();
        }
        this.create();
      }
    );
  }
  serachByNationalCode(searchTerm: HTMLInputElement) {
    this.searchFilter = searchTerm.value;
    this.userservice.serachByNationalCode(this.searchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);
          this.searchContainer = JSON.parse( JSON.stringify(this.JsonRow.result));
          this.requesterId = this.searchContainer['requesterId'];
          localStorage.setItem('requesterId', this.requesterId);
          this.d = localStorage.getItem('requesterId');
          this.FirstName = this.searchContainer['firstName'];
          this.LastName = this.searchContainer['lastName'];
          this.FatherName = this.searchContainer['fatherName'];
          this.Email = this.searchContainer['email'];
          this.ShomareShenasname = this.searchContainer['shomareShenasname'];
          this.IssuedFrom = this.searchContainer['issuedFrom'];
          this.Gender = this.searchContainer['gender'];
          this.MobileNo = this.searchContainer['mobileNo'];
          this.BirthDate = this.searchContainer['birthDate'];
          this.PoNum = this.searchContainer['poNum'];
          this.Address = this.searchContainer['adress'];
          this.CityidLvlTwo = this.searchContainer['cityidRealLvl'];
          this.Cityid = this.searchContainer['cityid'];
          this.FixedTel = this.searchContainer['fixedTel'];
        } else {

          this.disabledLink = true;
          this.changeBool.emit(this.disabledLink);

          this.formTaghaza.reset();
        }
        this.create();
      }
    );
  }
  sendFormTaghaza() {
    console.log(this.formTaghaza);
    console.log(this.formTaghaza.value);
  }
  SaveRequst() {
    const formObj = this.formTaghaza.getRawValue();
    this.userservice.Saverequst(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);
        } else {
          this.disabledLink = true;
          this.changeBool.emit(this.disabledLink);
        }
        this.create();
      }
    );
  }
  resetForm() {
    localStorage.removeItem('test');
    this.disabledLink = true;
    this.changeBool.emit(this.disabledLink);
    this.formTaghaza.reset();
  }

}
