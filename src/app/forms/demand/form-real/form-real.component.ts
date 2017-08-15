import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

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
  private today: NgbDateStruct;
  model;
  date: any;
  err: any;


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
    this.formTaghaza = this.fb.group({
      FormId:[1032],
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
    });
  }
  onEnter(searchTerm: string) {
    this.serchFilter = searchTerm;
    this.userservice.serachByNationalCode(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {


          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);


          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
          this.requesterId = this.serch['requesterId'];
          localStorage.setItem('requesterId', this.requesterId);
          this.d = localStorage.getItem('requesterId');
          this.FirstName = this.serch['firstName'];
          this.LastName = this.serch['lastName'];
          this.FatherName = this.serch['fatherName'];
          this.RequesterType = this.serch['requesterType'];
          this.Email = this.serch['email'];
          this.ShomareShenasname = this.serch['shomareShenasname'];
          this.IssuedFrom = this.serch['issuedFrom'];
          this.Gender = this.serch['gender'];
          this.MobileNo = this.serch['mobileNo'];
          this.BirthDate = this.serch['birthDate'];
          this.PoNum = this.serch['poNum'];
          this.Address = this.serch['adress'];
          this.CityidLvlTwo = this.serch['cityidRealLvl'];
          this.Cityid = this.serch['cityid'];
          this.FixedTel = this.serch['fixedTel'];
        } else {

          this.disabledLink = true;
          this.changeBool.emit(this.disabledLink);

          this.formTaghaza.reset();
        }
        this.create();
      }
    );
  }
  serachByNationalCode(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachByNationalCode(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);
          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
          this.requesterId = this.serch['requesterId'];
          localStorage.setItem('requesterId', this.requesterId);
          this.d = localStorage.getItem('requesterId');
          this.FirstName = this.serch['firstName'];
          this.LastName = this.serch['lastName'];
          this.FatherName = this.serch['fatherName'];
          // this.RequesterType = this.serch['requesterType'];
          this.Email = this.serch['email'];
          this.ShomareShenasname = this.serch['shomareShenasname'];
          this.IssuedFrom = this.serch['issuedFrom'];
          this.Gender = this.serch['gender'];
          this.MobileNo = this.serch['mobileNo'];
          this.BirthDate = this.serch['birthDate'];
          this.PoNum = this.serch['poNum'];
          this.Address = this.serch['adress'];
          this.CityidLvlTwo = this.serch['cityidRealLvl'];
          this.Cityid = this.serch['cityid'];
          this.FixedTel = this.serch['fixedTel'];
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
        console.log(this.JsonErrorMessage);
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
