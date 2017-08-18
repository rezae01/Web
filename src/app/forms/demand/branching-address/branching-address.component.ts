import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-branching-address',
  templateUrl: './branching-address.component.html',
  styleUrls: ['./branching-address.component.css']
})
export class BranchingAddressComponent implements OnInit {

  public BranchingAddress: FormGroup;

  submitted: boolean;
  re: any;
  serchFilter: any;
  serchFilip: any;
  serch: any;
  FirstName: any;
  LastName: any;
  PhoneNumber: any;
  Adress: any;
  Cityid: any;
  WorkDayCode: any;
  RdrCode: any;
  RdgSrl: any;
  BranchSrl: any;
  Phs: any;
  Amp: any;
  TrfCode: any;
  PwrCnt: any;
  BranchCode: any;
  RegionId: any;
  RegionName: any;
  CityName: any;
  BillId: any;

  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;



  region:any;
  result:any;
  value:any;
  city1:any;
  city:any;
  constructor(
    private _service: NotificationsService,
    private fb: FormBuilder,
    public userservice: UserService
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
    this.BranchingAddress = this.fb.group({
      FormId: [1029],
      RequesterId:[1],
      // FormName:[2],
      RegionIdBranch: [null, Validators.compose([Validators.required])],// امور
      CityidBranchAddress: [null, Validators.compose([Validators.required])], //  بخش
      PoNumBranchAddress: [null, Validators.compose([Validators.required])],
      FixedTelBranchAddress: [null, Validators.compose([Validators.required])],
      AdressBranchAddress: [null, Validators.compose([Validators.required])],
      FaxBranchAddress: [null, Validators.compose([Validators.required])],
      FixedTel2BranchAddress: [null, Validators.compose([Validators.required])],
      Street1BranchAddress: [null, Validators.compose([Validators.required])],
      Street2BranchAddress: [null, Validators.compose([Validators.required])],
      AlleyBranchAddress: [null, Validators.compose([Validators.required])],
      Alley1BranchAddress: [null, Validators.compose([Validators.required])],
      PlakBranchAddress: [null, Validators.compose([Validators.required])],
      LongitudeyBranchAddress:[null, Validators.compose([Validators.required])],
      LatituexBranchAddress:[null, Validators.compose([Validators.required])],
      BranchMojaverLeft: [''],
      BranchMojaverRight:[''],
      MojaverIDLeft:[''],
      MojaverIDRight:[''],
      TotalRequestedSquare:[''],
      BranchGeoState: [''],
      BranchGeoAreaCode: [''],
      // BranchVillageCode: [''],
      FloorCount: [''],

      // GeoStateOffice:[''],
      // GeoAreaCodeOffice:[''],
      RegionIdOffice: [''],
      CityidOfficeAddress: [''],
      PoNumOfficeAddress: [''],
      FixedTelOfficeAddress: [''],
      FixedTel2OfficeAddress: [''],
      AdressOfficeAddress: [''],
      Street1OfficeAddress: [''],
      Street2OfficeAddress: [''],
      // AlleyOfficeAddress: [''],  //
      // Alley1OfficeAddress: [''], //
      PlakOfficeAddress: [''],
      FaxOfficeAddress: [''],
      // LongitudeyOfficeAddress: [''],
      // LatituexOfficeAddress: ['']



    });
  }
  BranchingAddressRes(){
    console.log(this.BranchingAddress);
    console.log(this.BranchingAddress.value);
  }
  resetForm() {
    this.BranchingAddress.reset();
  }
  SaveRequst() {
    const formObj = this.BranchingAddress.getRawValue();
    this.userservice.SaveRequstAdressRes(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        console.log(this.JsonErrorMessage);
        if (this.JsonRow.resultStatus === 200) {
          this.BranchingAddress.reset();
        } 
        this.create();
      }
    );
  }
}
