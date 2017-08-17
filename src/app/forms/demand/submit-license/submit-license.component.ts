import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { UserService } from '../../../_service/user.service';
import './../../../../assets/javascript/jquery.tosrus.all.min.js';
import './../../../../assets/css/jquery.tosrus.all.css';

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

declare var $: any;

@Component({
  selector: 'app-submit-license',
  templateUrl: './submit-license.component.html',
  styleUrls: ['./submit-license.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class SubmitLicenseComponent implements OnInit {
  public submitLicense: FormGroup;


  private today: NgbDateStruct;
  model: NgbDateStruct;
  modelOne: NgbDateStruct;
  modelTwo: NgbDateStruct;
  modelThree: NgbDateStruct;
  modelFour: NgbDateStruct;
  list: any;
  date: {year: number, month: number};

  test: any;
  id: number;
  id2: any;


  re: any;
  re1: any;
  re1level2: any;
  re1level2Row: any;
  change: any;

  private sub: any;
  grid: any;



  region: any;
  result: any;
  mk: any;
  mkTwe: any;
  constructor(
    private fb: FormBuilder,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    public  userservice: UserService
  ) {

    this.userservice.GetParameter().subscribe(
      post => {
        this.region = post;
        this.result = this.region.result;
      }
    );
    this.userservice.GetParameterTwo().subscribe(
      post => {
        this.mk = post;
        this.mkTwe = this.mk.result;
      }
    );
  }
  ngOnInit() {
    $(function(){
      $('#example-1 a').tosrus({
					// tslint:disable-next-line:indent
					buttons: 'inline',
					// tslint:disable-next-line:indent
					pagination	: {
						add			: true,
						// tslint:disable-next-line:indent
						type		: 'thumbnails'
					// tslint:disable-next-line:indent
					}
				});
    });
    this.submitLicense = this.fb.group({
      RequestId: [null, Validators.compose([Validators.required])],
      BranchId: [null, Validators.compose([Validators.required])],
      AuthorizationNum: [null, Validators.compose([Validators.required])],
      AuthorizationIssueDate: [null, Validators.compose([Validators.required])],
      AuthorizationExpDate: [null, Validators.compose([Validators.required])],
      AuthorizationIssuer: [null, Validators.compose([Validators.required])],
      AuthorizationType: [null, Validators.compose([Validators.required])],
      LetterNum: [null, Validators.compose([Validators.required])],
      DocumentType: [null, Validators.compose([Validators.required])],
      NationalCode: [null, Validators.compose([Validators.required])],
      Amper: [null, Validators.compose([Validators.required])],
      Phase: [null, Validators.compose([Validators.required])],
    });
  }
  getdata(data: any) {
    const data1: any = data;
    let other = []; // your other array...
    let temp = [];
    temp = JSON.parse( localStorage.getItem('grid'));
    if ( temp != null) {
      other = JSON.parse( localStorage.getItem('grid'));
    }
    other.push(data1);
    localStorage.setItem('grid', JSON.stringify( other));
    this.list = JSON.parse( localStorage.getItem('grid'));
    console.log(this.list);
    // data1.map(item => {
    //     return {
    //         courseid: item.firstName,
    //         name: item.lastName
    //     }
    // }).forEach(item => other.push(item));
    // localStorage.setItem('test',JSON.stringify(other));
    // console.log(localStorage.getItem('test'));
  }
  SaveRequstSubmitLicense() {
    const formObj = this.submitLicense.getRawValue();
    this.userservice.SaveRequstSubmitLicense(formObj).subscribe(
      res => {
        this.re = res;
        this.re1 = this.re.resultStatus;

        console.log(this.re1);

        this.re1level2 = this.re.error;
        this.re1level2Row = this.re1level2.errorMessage;
      }
    );
  }
  SendsubmitLicense() {
    console.log(this.submitLicense.value);
  }

}
