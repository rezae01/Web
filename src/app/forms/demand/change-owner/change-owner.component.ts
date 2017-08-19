import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-owner',
  templateUrl: './change-owner.component.html',
  styleUrls: ['./change-owner.component.css'],
  providers: [UserService]
})
export class ChangeOwnerComponent implements OnInit {
  BranchCode: number;
  FormName: number;
  FormId: number;

  NationalCode = '';
  FirstName = '';
  LastName = '';
  FatherName = '';
  serch: any;
  serchFilter: any;
  serchFilip: any;
  private sub:  any;
  re: any;
  grid: any;
  public ChangeOwner: FormGroup;
  public ChangeOwnerSearch: FormGroup;

  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  constructor(
    private fb: FormBuilder,
    public  userservice: UserService,
    private _service: NotificationsService,
  ) {

  }
  ngOnInit() {
    this.ChangeOwner = this.fb.group({
      FormId: [1025],
      FormName: [3],
      BranchCode: [],
      NationalCode: [null, Validators.compose([Validators.required])],
      FirstName: [null, Validators.compose([Validators.required])],
      LastName: [null, Validators.compose([Validators.required])],
      FatherName: [null, Validators.compose([Validators.required])],
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
  ChangeOwnerRes() {
    // console.log(this.ChangeOwner);
    // console.log(this.ChangeOwner.value);
  }
  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
      this.userservice.serachByPassOwner(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.serch = JSON.parse( JSON.stringify(this.serchFilip.result));
          this.BranchCode = this.serch['branchCode'];
          this.NationalCode = this.serch['nationalCode'];
          this.FirstName = this.serch['firstName'];
          this.LastName = this.serch['lastName'];
          this.FatherName = this.serch['fatherName'];
          // console.log(this.serch);
        } else {
          this.ChangeOwner.reset();
        }
        this.create();
       }
    );
  }
  SaveRequstChangeOwner() {
    const formObj = this.ChangeOwner.getRawValue();
    this.userservice.SaveRequstOwner(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        // console.log(this.JsonErrorMessage);
        this.create();
      }
    );
  }
}
