import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-tariff',
  templateUrl: './change-tariff.component.html',
  styleUrls: ['./change-tariff.component.css']
})
export class ChangeTariffComponent implements OnInit {

  public changeTariff: FormGroup;

  submitted: boolean;
  re: any;
  serchFilter:any;
  serchFilip:any;
  serch:any;
  FirstName:any;
  LastName:any;
  PhoneNumber:any;
  Adress:any;
  Cityid:any;
  WorkDayCode:any;
  RdrCode:any;
  RdgSrl:any;
  BranchSrl:any;
  Phs:any;
  Amp:any;
  TrfCode:any;
  PwrCnt:any;
  BranchCode:any;
  RegionId:any;
  RegionName:any;
  CityName:any;
  BillId:any;

  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  constructor(
    private _service: NotificationsService,
    private fb: FormBuilder,
    public userservice: UserService
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
  ngOnInit() {
    this.changeTariff = this.fb.group({
      RequesterId: new FormControl(2),
      FormId: new FormControl(1024),
      ProcessId: new FormControl(1),
      BranchCode: [null, Validators.compose([Validators.required])],
      FormName:[2],
      TrfHcode: [null, Validators.compose([Validators.required])],
    });
  }
  onEnter(searchTerm: string) {
    this.serchFilter = searchTerm;
    this.userservice.serachByPassTariff(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.serch =JSON.parse( JSON.stringify(this.JsonRow.result));
          this.FirstName = this.serch["firstName"];
          this.LastName = this.serch["lastName"];
          this.PhoneNumber = this.serch["phoneNumber"];
          this.Adress = this.serch["address"];
          this.Cityid = this.serch["cityId"];
          this.CityName = this.serch["cityName"];
          this.WorkDayCode = this.serch["workDayCode"];
          this.RdrCode = this.serch["rdrCode"];
          this.RdgSrl = this.serch["rdgSrl"];
          this.BranchSrl = this.serch["branchSrl"];
          this.Phs = this.serch["phs"];
          this.Amp = this.serch["amp"];
          this.TrfCode = this.serch["trfCode"];
          this.PwrCnt = this.serch["pwrCnt"];
          this.BranchCode = this.serch["branchCode"];
          this.BillId = this.serch["BillId"];
          this.RegionId = this.serch["regionId"];
          this.RegionName = this.serch["regionName"];
          console.log(this.serch);
        } else {
          this.changeTariff.reset();
        }
        this.create();
      }
    );
  }
  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachByPassTariff(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.serch =JSON.parse( JSON.stringify(this.JsonRow.result));
          this.FirstName = this.serch["firstName"];
          this.LastName = this.serch["lastName"];
          this.PhoneNumber = this.serch["phoneNumber"];
          this.Adress = this.serch["address"];
          this.Cityid = this.serch["cityId"];
          this.CityName = this.serch["cityName"];
          this.WorkDayCode = this.serch["workDayCode"];
          this.RdrCode = this.serch["rdrCode"];
          this.RdgSrl = this.serch["rdgSrl"];
          this.BranchSrl = this.serch["branchSrl"];
          this.Phs = this.serch["phs"];
          this.Amp = this.serch["amp"];
          this.TrfCode = this.serch["trfCode"];
          this.PwrCnt = this.serch["pwrCnt"];
          this.BranchCode = this.serch["branchCode"];
          this.BillId = this.serch["BillId"];
          this.RegionId = this.serch["regionId"];
          this.RegionName = this.serch["regionName"];
          console.log(this.serch);
        } else {
          this.changeTariff.reset();
        }
        this.create();
      }
    );
  }
  changeTariffRes(){
    console.log(this.changeTariff);
    console.log(this.changeTariff.value);
  }
  resetForm(){
    this.changeTariff.reset();
    this.TrfCode = '';
    this.WorkDayCode = '';
    this.Cityid = '';
    this.RdrCode = '';
    this.RdgSrl = '';
    this.RegionName = '';
    this.CityName = '';
    this.Phs = '';
    this.Amp = '';
    this.PhoneNumber = '';
    this.Adress = '';
  }
  SaveRequst(){
    const formObj = this.changeTariff.getRawValue();
    this.userservice.SaveRequstTariff(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        console.log(this.JsonErrorMessage);
        if (this.JsonRow.resultStatus === 200) {
          this.changeTariff.reset();
        } 
        this.create();
      }
    );
  }
}
