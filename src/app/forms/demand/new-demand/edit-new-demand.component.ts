import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { User } from './new-demand';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

import { Task } from '../../demand/model/task';
declare var $: any;
@Component({
  selector: 'app-edit-new-demand',
  templateUrl: './edit-new-demand.component.html',
  styleUrls: ['./edit-new-demand.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class EditNewDemandComponent implements OnInit {


//   tasks: Task[];
//   @Output() addTask = new EventEmitter();
//   @Input() lastTaskId: number;
  @Input() task: Task;



  public NewDemand: FormGroup;
  re: any;
  private today: NgbDateStruct;
  model: NgbDateStruct;
  id2: any;

  private sub: any;
  trf: any;
  trfType: any;
  amp: any;
  Amper: any;
  TrfType: any;
  Phase: any;
  region: any;
  region1: any;
  Phs: any;
  result: any;
  city1: any;
  city: any;
  arr: any;
  requestId: any = '';
  regionName: any = '';
  cityName: any = '';
  requestDate: any = '';
  test: any;
  test1: any;
  value: any;
  value1: any;
  d: any;

  CalculationData: Array<any> = [];



  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;



  t1: any;
  t2: any;
  list: any;
  constructor(
    private fb: FormBuilder,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    public  userservice: UserService,
    private _service: NotificationsService,
  ) {
    this.today = calendar.getToday();
    this.d = localStorage.getItem('requesterId');

    this.userservice.getcity().subscribe(
      post => {
        this.region = post;
        this.result = this.region.result;
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
  // tslint:disable-next-line:member-ordering
  id = new FormControl('');

  public ngOnInit() {
    this.NewDemand = this.fb.group({
      id: this.id,
      RequesterId: [12],
      FormId: [9],
      ProcessId: [1],
      CalculationData: this.fb.array([this.initItemRows()]),
      AdjacentBranch: new FormGroup({
        AuthorizationNum: new FormControl('', <any>Validators.required),
        AuthorizationIssueDate: new FormControl('', <any>Validators.required),
        AuthorizationExpDate: new FormControl('', <any>Validators.required),
        AuthorizationIssuer: new FormControl('', <any>Validators.required),
        AuthorizationType: new FormControl('', <any>Validators.required),
        LetterNum: new FormControl('', <any>Validators.required),
        NationalCode: new FormControl('', <any>Validators.required),
        Phase: new FormControl('', <any>Validators.required),
        Amper: new FormControl('', <any>Validators.required),
        DocumentType: new FormControl('', <any>Validators.required)
      }),
    });
  }
  initItemRows() {
    return this.fb.group({
      TrfType: ['' , <any>Validators.required],
      Phs: ['' , <any>Validators.required],
      TrfHCode: ['' , <any>Validators.required],
      Count: ['' , <any>Validators.required],
      PwrIcn: ['' , <any>Validators.required],
      PwrCnt: ['' , <any>Validators.required],
      VoltCode: ['' , <any>Validators.required],
      Amp: ['' , <any>Validators.required],
      FmlCode: [],
    });
  }
  AddDemand() {
      const control = <FormArray>this.NewDemand.controls['CalculationData'];
      control.push(this.initItemRows());
  }
  RemoveDemand(i: number) {
        const control = <FormArray>this.NewDemand.controls['CalculationData'];
        control.removeAt(i);
  }
  resetForm() {
    this.NewDemand.reset();
    // localStorage.removeItem('NewDemand');
  }

  SaveRequst() {
    const formObj = this.NewDemand.getRawValue();
    this.userservice.SaverequstNewDemand(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;

        // localStorage.setItem('requestId', this.re.result.requestId);
        // localStorage.setItem('branchCode', this.re.branchCode);
        console.log(this.JsonRow);
        // console.log(this.JsonRow.result.requestId);

        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        // console.log(this.JsonErrorMessage);
        if (this.JsonRow.resultStatus === 200) {
          this.NewDemand.reset();
        }
        this.create();
      }
    );
  }

}
