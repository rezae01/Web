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

  cityValParent: any;
  cityValChild: any;

  regionValParent: any;
  regionValChild: any;

  value: any;

  searchContainer: any;
  searchFilter: any;


  serchFilip: any;
  d: any;
  requesterId: any;
  public formTaghaza: FormGroup;



  ShenaseCode: any = '';
  EconomicCode: any = '';
  FirstName: any = '';
  CompanyType: any = '';
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
      FormId: [1035],
      EconomicCode: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      FirstName: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      CompanyType: ['', Validators.compose([Validators.required])],
      RequesterType: [1],
      Email: [null, Validators.compose([CustomValidators.email, Validators.maxLength(40)])],
      PoNum: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      Adress: [null, Validators.compose([Validators.required, Validators.maxLength(1024)])],
      Cityid: [null, Validators.compose([Validators.required])],
      CityidLvlTwo: [null],
      FixedTel: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      MobileNo: [null, Validators.compose([Validators.minLength(8), Validators.maxLength(11)])],
      // legalRepresentative: this.fb.group({
      //   ManagerFirstName: ['', Validators.required],
      //   ManagerLastName: ['', Validators.required],
      //   NationalCode: ['', Validators.required],
      //   EconomicCode: ['', Validators.required],
      //   cityId: ['', Validators.required],
      //   ActType: ['', Validators.required],
      //   RegNum: ['', Validators.required],
      //   Nationality: ['', Validators.required],
      //   te: this.fb.array([this.loopOne()]),
      //   te2: this.fb.array([this.loopTwo()])
      // }),
    });
  }
  loopOne() {
    return this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      FatherName: ['', Validators.required],
      shomareShenasname: ['', Validators.required],
      IssuedFrom: ['', Validators.required],
    });
  }
  loopTwo() {
    return this.fb.group({
      bank: ['', Validators.required],
      FatherName: ['', Validators.required],
      shomareShenasname: ['', Validators.required],
      IssuedFrom: ['', Validators.required],
    });
  }
  // 10380284790
  onEnter(searchTerm: string) {
    this.searchFilter = searchTerm;
    this.userservice.serachGetRegisteredByEconomic(this.searchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        console.log(this.JsonRow);
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {

          this.disabledLink = false;
          this.changeBool.emit(this.disabledLink);

          this.searchContainer = JSON.parse( JSON.stringify(this.JsonRow.result));
          localStorage.setItem('requesterId', this.requesterId);
          this.requesterId = this.searchContainer['requesterId'];
          this.d = localStorage.getItem('requesterId');
          this.ShenaseCode = this.searchContainer['shenaseCode'];
          this.EconomicCode = this.searchContainer['economicCode'];
          this.FirstName = this.searchContainer['firstName'];
          this.CompanyType = this.searchContainer['companyType'];
          this.Email = this.searchContainer['email'];
          this.MobileNo = this.searchContainer['mobileNo'];
          this.PoNum = this.searchContainer['poNum'];
          this.Address = this.searchContainer['adress'];
          this.FixedTel = this.searchContainer['fixedTel'];
          this.CityidLvlTwo = this.searchContainer['cityidLegalLvlTwo'];
          this.Cityid = this.searchContainer['cityid'];
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
    this.searchFilter = searchTerm.value;
    this.userservice.serachGetRegisteredByEconomic(this.searchFilter).subscribe(
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
          this.ShenaseCode = this.searchContainer['shenaseCode'];
          this.EconomicCode = this.searchContainer['economicCode'];
          this.FirstName = this.searchContainer['firstName'];
          this.CompanyType = this.searchContainer['companyType'];
          this.Email = this.searchContainer['email'];
          this.MobileNo = this.searchContainer['mobileNo'];
          this.PoNum = this.searchContainer['poNum'];
          this.Address = this.searchContainer['adress'];
          this.FixedTel = this.searchContainer['fixedTel'];
          this.CityidLvlTwo = this.searchContainer['cityidLegalLvlTwo'];
          this.Cityid = this.searchContainer['cityid'];
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
