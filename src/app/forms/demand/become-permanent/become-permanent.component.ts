import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-become-permanent',
  templateUrl: './become-permanent.component.html',
  styleUrls: ['./become-permanent.component.css']
})
export class BecomePermanentComponent implements OnInit {
  re: any;
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
  RegionName: any = '';
  BillId: any = '';


  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  public become: FormGroup;
  private sub: any;
  constructor(
    private fb: FormBuilder,
    public  userservice: UserService,
    private _service: NotificationsService,
  ) {

  }

  ngOnInit() {
    this.become = this.fb.group({
      BranchCode: [null, Validators.compose([Validators.required])],
      FormName: [4],
      FormId: [1026],
    });
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

  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachByPassBecome(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
          this.FirstName = this.serch['firstName'];
          this.LastName = this.serch['lastName'];
          this.PhoneNumber = this.serch['phoneNumber'];
          this.Address = this.serch['address'];
          this.CityName = this.serch['cityName'];
          this.CityId = this.serch['cityId'];
          this.WorkDayCode = this.serch['workDayCode'];
          this.RdrCode = this.serch['rdrCode'];
          this.RdgSrl = this.serch['rdgSrl'];
          this.BranchSrl = this.serch['branchSrl'];
          this.Phs = this.serch['phs'];
          this.Amp = this.serch['amp'];
          this.TrfCode = this.serch['trfCode'];
          this.PwrCnt = this.serch['pwrCnt'];
          this.BranchCode = this.serch['branchCode'];
          this.BillId = this.serch['BillId'];
          this.RegionName = this.serch['regionName'];
          console.log(this.serch);
        } else {
          this.become.reset();
        }
        this.create();
       }
    );
  }
  resetForm() {
    this.become.reset();
  }
  BecomeRes() {
    console.log(this.become);
    console.log(this.become.value);
  }
  SaveRequstBecome() {
    const formObj = this.become.getRawValue();
    this.userservice.SaveRequstTariff(formObj).subscribe(res => {this.re = res; console.log(res); });
  }

}
