import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-existing-divisions',
  templateUrl: './existing-divisions.component.html',
  styleUrls: ['./exixting-divisions.component.css'],
  providers: [ UserService ]
})
export class ExistingDivisionsComponent implements OnInit {
  public existing: FormGroup;
  re: any;

  // serch
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
    private _service: NotificationsService,
    private fb: FormBuilder,
    public userservice: UserService,
  ) {}
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
    this.existing = this.fb.group({
      BranchCode: new FormControl('',Validators.required),
      FullName:new FormControl(''),
      PhoneNumber: new FormControl(''),
      Address: new FormControl(''),
      FileNumber: new FormControl(''),
      CityNameID: new FormControl(''),
      RegionNameID: new FormControl(''),
      BranchCodeView: new FormControl(''),
      BranchSrl: new FormControl(''),
      Phs: new FormControl(''),
      Amp: new FormControl(''),
      TrfCode: new FormControl(''),
      PwrCnt: new FormControl(''),
      VillageCode:new FormControl(''),
      // BillId: [],

      // CreationDate: [],
    });
  }

onEnter(searchTerm: string) {
    this.serchFilter = searchTerm;
    this.userservice.serachByPassExisting(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        console.log(this.JsonRow);
        if (this.JsonRow.resultStatus === 200) {
          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));

          // this.FirstName = this.serch['firstName'];
          // this.LastName = this.serch['lastName'];
          this.PhoneNumber = this.serch['phoneNumber'];
          this.Address = this.serch['address'];
          this.BranchSrl = this.serch['branchSrl'];
          this.Phs = this.serch['phs'];
          this.Amp = this.serch['amp'];
          this.TrfCode = this.serch['trfCode'];
          this.PwrCnt = this.serch['pwrCnt'];
          this.BranchCode = this.serch['branchCode'];
          this.CityNameID = this.serch['cityName'] + '(' + this.serch['cityId'] + ')';
          this.RegionNameID = this.serch['regionName'] + '(' + this.serch['regionId'] + ')';
          this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
          this.FullName = this.serch['firstName'] + this.serch['lastName'];
          this.VillageCode = this.serch['villageCode'];

          this.BranchCodeView = this.serch['branchCode'];
          // this.BillId = this.serch['BillId'];
          // this.CreationDate = this.serch['creationDate'];
          // console.log(this.databind);
          console.log(this.FileNumber);
          console.log(this.CityNameID);
          console.log(this.RegionNameID);
          console.log(this.FullName);
        } else {
          this.existing.reset();
        }
        // this.getdata(this.JsonRow);
        this.create();
      }
    );
  }
  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachByPassExisting(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        console.log(this.JsonRow.result);
        if (this.JsonRow.resultStatus === 200) {
          this.serch = JSON.parse( JSON.stringify(this.JsonRow.result));
          // this.FirstName = this.serch['firstName'];
          // this.LastName = this.serch['lastName'];
          this.PhoneNumber = this.serch['phoneNumber'];
          this.Address = this.serch['address'];
          this.BranchSrl = this.serch['branchSrl'];
          this.Phs = this.serch['phs'];
          this.Amp = this.serch['amp'];
          this.TrfCode = this.serch['trfCode'];
          this.PwrCnt = this.serch['pwrCnt'];
          this.BranchCode = this.serch['branchCode'];
          this.BranchCodeView = this.serch['branchCode'];
          this.CityNameID = this.serch['cityName'] + '(' + this.serch['cityId'] + ')';
          this.RegionNameID = this.serch['regionName'] + '(' + this.serch['regionId'] + ')';
          this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
          this.FullName = this.serch['firstName'] + this.serch['lastName'];
          this.VillageCode = this.serch['villageCode'];

          // this.BranchCodeView = this.serch['branchCode'];
          // this.BillId = this.serch['BillId'];
          // this.CreationDate = this.serch['creationDate'];
          // console.log(this.databind);
          console.log(this.JsonRow.result);
        } else {
          this.existing.reset();
        }
        // this.getdata(this.JsonRow.result);
        this.create();
      }
    );
  }
  t1:any;
  t2:any;
  list:any[];
  formObj:any;
  SaveRequst(){
    console.log(this.existing.value);
    this.t1 = this.existing.value;
    // this.formObj = this.existing.getRawValue();
    // console.log(this.formObj);
    let existingSend = [];
    let existing = [];
    existing = JSON.parse(localStorage.getItem('existing'));
    if (existing != null) {
      existingSend = JSON.parse(localStorage.getItem('existing'));
    }
    let exist: any = this.t1;
    // console.log([exist]);
    existingSend.push(exist);
    localStorage.setItem('existing', JSON.stringify( existingSend ));
    this.list = JSON.parse( localStorage.getItem('existing'));
    console.log(this.list);
  }

  RemoveData(list, index){
    alert(this.list);
    this.list.push();
    this.list.splice(index, 1);
    if (this.list.length < 1) {
       localStorage.removeItem('existing');
      }else {
        localStorage.removeItem('existing');
        localStorage.setItem('existing', JSON.stringify( this.list ));
      }
    console.log(this.list);
 }

}

