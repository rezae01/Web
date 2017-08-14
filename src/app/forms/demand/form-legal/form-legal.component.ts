import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserService } from '../../../_service/user.service';

import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-form-legal',
  templateUrl: './form-legal.component.html',
  styleUrls: ['./form-legal.component.css'],
  providers: [
    UserService
]
})
export class FormLegalComponent implements OnInit {
  re: any;
  public result: any;
  region: any;
  serch: any;
  value: any;
  city: any;
  city1: any;
  serchFilter: any;

  serchFilip: any;
  d: any;
  requesterId: any;
  public formTaghaza: FormGroup;



  ShenaseCode: any = '';
  EconomicCode: any = '';
  FirstName: any = '';
  CompanyType: any = '';
  RequesterType: any = '';
  Email: any = '';
  MobileNo: any = '';
  PoNum: any = '';
  Address: any = '';
  PhoneNumber: any = '';
  CityidLvlTwo: any = '';
  Cityid: any = '';
  FixedTel: any = '';

  @Input() disabledLink: boolean;
  @Output() changeBool = new EventEmitter;

  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  constructor(
    private _service: NotificationsService,
    private fb: FormBuilder,
    public  userservice: UserService
  ) {
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
      EconomicCode: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      FirstName: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      CompanyType: ['', Validators.compose([Validators.required])],
      RequesterType: ['1'],
      Email: [null, Validators.compose([CustomValidators.email, Validators.maxLength(40)])],
      PoNum: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      Adress: [null, Validators.compose([Validators.required, Validators.maxLength(1024)])],
      Cityid: [null, Validators.compose([Validators.required])],
      CityidLvlTwo: [null],
      FixedTel: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      MobileNo: [null, Validators.compose([Validators.minLength(8), Validators.maxLength(11)])],
    });
  }
  // 10380284790
  onEnter(searchTerm: string) {
    this.serchFilter = searchTerm;
    this.userservice.serachGetRegisteredByEconomic(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        console.log(this.JsonRow);
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {


          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);

          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
          localStorage.setItem('requesterId', this.requesterId);
          this.requesterId = this.serch['requesterId'];
          this.d = localStorage.getItem('requesterId');
          this.ShenaseCode = this.serch['shenaseCode'];
          this.EconomicCode = this.serch['economicCode'];
          this.FirstName = this.serch['firstName'];
          this.CompanyType = this.serch['companyType'];
          this.RequesterType = this.serch['requesterType'];
          this.Email = this.serch['email'];
          this.MobileNo = this.serch['mobileNo'];
          this.PoNum = this.serch['poNum'];
          this.Address = this.serch['adress'];
          this.FixedTel = this.serch['fixedTel'];
          this.CityidLvlTwo = this.serch['cityidLegalLvlTwo'];
          this.Cityid = this.serch['cityid'];
        } else {
          this.disabledLink = true;
          this.changeBool.emit(this.disabledLink);

          this.formTaghaza.reset();
        }
        this.create();
      }
    );
  }
  serachByEconomicCode(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachGetRegisteredByEconomic(this.serchFilter).subscribe(
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
          this.ShenaseCode = this.serch['shenaseCode'];
          this.EconomicCode = this.serch['economicCode'];
          this.FirstName = this.serch['firstName'];
          this.CompanyType = this.serch['companyType'];
          this.RequesterType = this.serch['requesterType'];
          this.Email = this.serch['email'];
          this.MobileNo = this.serch['mobileNo'];
          this.PoNum = this.serch['poNum'];
          this.Address = this.serch['adress'];
          this.FixedTel = this.serch['fixedTel'];
          this.CityidLvlTwo = this.serch['cityidLegalLvlTwo'];
          this.Cityid = this.serch['cityid'];
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
  SaveRequstLegal() {
    const formObj = this.formTaghaza.getRawValue();
    this.userservice.SaverequstLegal(formObj).subscribe(
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
        console.log(this.JsonErrorMessage);
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
