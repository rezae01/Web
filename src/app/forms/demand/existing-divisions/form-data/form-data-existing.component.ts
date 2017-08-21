import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../../../_service/user.service';
import { SplitInformation } from '../../../demand/model/SplitInformation';
declare var $: any;

@Component({
  selector: 'app-form-data-existing',
  templateUrl: './form-data-existing.component.html',
  styleUrls: ['./form-data-existing.component.css'],
  providers: [UserService]
})
export class FormDataExistingComponent implements OnInit {

    public existing: FormGroup;
    SplitInformations: SplitInformation[];
    @Input() lastSplitInformationId: number;


    @Output() addSplitInformations = new EventEmitter();

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
    FileNumber: any = '';
    FullName: any = '';
    CityNameID: any = '';
    RegionNameID: any = '';
    VillageName: any = '';



    VillageCode: any = '';
    databind: any[] = [];

    JsonRow: any;
    AfterRow: any;
    JsonError: any;
    JsonErrorMessage: any;
    isReadonly = true;
    id = new FormControl('');
    constructor(
        private _service: NotificationsService,
        public userservice: UserService,
        private fb: FormBuilder,
    ) { }

    public ngOnInit() {
        this.existing = this.fb.group({
            id: this.id,
            BranchCode: new FormControl(null, Validators.required),
            FullName: new FormControl({value: null, redanli: false}, Validators.required),
            PhoneNumber: new FormControl({value: null, disabled: false}, Validators.required),
            Address: new FormControl({value: null, disabled: false}, Validators.required),
            FileNumber: new FormControl({value: null, disabled: false}, Validators.required),
            CityNameID: new FormControl({value: null, disabled: false}, Validators.required),
            RegionNameID: new FormControl({value: null, disabled: false}, Validators.required),
            BranchCodeView: new FormControl({value: null, disabled: false}, Validators.required),
            BranchSrl: new FormControl({value: null, disabled: false}, Validators.required),
            Phs: new FormControl({value: null, disabled: false}, Validators.required),
            Amp: new FormControl({value: null, disabled: false}, Validators.required),
            TrfCode: new FormControl({value: null, disabled: false}, Validators.required),
            PwrCnt: new FormControl({value: null, disabled: false}, Validators.required),
            VillageCode: new FormControl({value: null, disabled: false}, Validators.required),
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
              // tslint:disable-next-line:max-line-length
              this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
              this.FullName = this.serch['firstName'] + this.serch['lastName'];
              this.VillageCode = this.serch['villageCode'];
              this.BranchCodeView = this.serch['branchCode'];
              console.log(this.databind);
            } else {
              this.existing.reset();
            }
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
              // tslint:disable-next-line:max-line-length
              this.FileNumber = this.serch['cityId'] + '/' + this.serch['workDayCode'] + '/' + this.serch['rdrCode'] + '/' + this.serch['rdgSrl'];
              this.FullName = this.serch['firstName'] + this.serch['lastName'];
              this.VillageCode = this.serch['villageCode'];
              console.log(this.databind);
            } else {
              this.existing.reset();
            }
            this.create();
          }
        );
    }
    createTable() {
        this.id.setValue(this.lastSplitInformationId);
        this.addSplitInformations.emit(this.existing.value);
        console.log(this.addSplitInformations);
        this.existing.reset();
    }
// tslint:disable-next-line:eofline
}