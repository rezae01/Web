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
  selector: 'app-new-demand',
  templateUrl: './new-demand.component.html',
  styleUrls: ['./new-demand.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class NewDemandComponent implements OnInit {


  tasks: Task[];
  @Output() addTask = new EventEmitter();
  @Input() lastTaskId: number;



  public NewDemand: FormGroup;
  re: any;
  private today: NgbDateStruct;
  model: NgbDateStruct;
  // id2: any;

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
  // list: any;
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
  // setValue(value: string) {
  //   this.value = value;
  //   this.userservice.getcitylvl2(this.value).subscribe(
  //     post => {
  //       this.city1 = post;
  //       this.city = this.city1.result;
  //     }
  //   );
  // }
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
  id = new FormControl();
  // tslint:disable-next-line:member-ordering
  // id2 = new FormControl();
  public ngOnInit() {
    // $(function(){
    //   $('.stepOne').hide();
    //   $('.stepTwo').hide();
    //   $('#TrfCode').change(function(){
    //       if($('#TrfCode').val() == 2) {
    //         $('.stepOne').show();
    //         $('.stepTwo').hide();
    //       } else if ($('#TrfCode').val() == 3) {
    //         $('.stepTwo').show();
    //         $('.stepOne').hide();
    //       } else if ($('.hideOption').val() == 1) {
    //         $('.stepTwo').hide();
    //         $('.stepOne').hide();
    //       } else if ($('.hideOption').val() == 4) {
    //         $('.stepTwo').hide();
    //         $('.stepOne').hide();
    //       } else if ($('.hideOption').val() == 5) {
    //         $('.stepTwo').hide();
    //         $('.stepOne').hide();
    //       }
    //   });
    // });
    this.NewDemand = this.fb.group({
      id: this.id,
      RequesterId: new FormControl(1),
      FormId: new FormControl(9),
      ProcessId: new FormControl(1),
      CalculationData: this.fb.array([this.initItemRows()]),
    });
  }
  initItemRows() {
    return this.fb.group({
      // id2: this.id2;
      TrfType: new FormControl('', Validators.required),
      Phs: new FormControl('', Validators.required),
      TrfHCode: new FormControl('', Validators.required),
      TrfDetailCode: new FormControl('', Validators.required),
      Count: new FormControl('', Validators.required),
      PwrIcn: new FormControl('', Validators.required),
      PwrCnt: new FormControl('', Validators.required),
      VoltCode: new FormControl('', Validators.required),
      Amp: new FormControl('', Validators.required),
      FmlCode: new FormControl(''),
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



    // console.log(this.NewDemand.value);
    // this.t1 = this.NewDemand.value;
    // this.t2 = this.t1.CalculationData;
    // let NewDemandSend = [];
    // let NewDemand = [];
    // NewDemand = JSON.parse( localStorage.getItem('NewDemand'));
    // if (NewDemand != null) {
    //   NewDemandSend = JSON.parse( localStorage.getItem('NewDemand'));
    // }
    // let data1: any = this.t1;
    // NewDemandSend.push(data1);
    // console.log(NewDemandSend);
    // localStorage.setItem('NewDemand', JSON.stringify( NewDemandSend ));
    // this.list = JSON.parse( localStorage.getItem('NewDemand'));
    // console.log(this.list);
  }
  // testJSON() {
  //   this.t1 = this.NewDemand.value;
  //   this.t2 = this.t1.CalculationData;
  //   let NewDemandSend = [];
  //   let NewDemand = [];
  //   NewDemand = JSON.parse( localStorage.getItem('NewDemand'));
  //   if (NewDemand != null) {
  //     NewDemandSend = JSON.parse( localStorage.getItem('NewDemand'));
  //   }
  //   // let data1 = this.t1;
  //   NewDemandSend.push(this.t1);
  //   localStorage.setItem('NewDemand', JSON.stringify( NewDemandSend ));
  //   this.list = JSON.parse( localStorage.getItem('NewDemand'));
  //   console.log(this.list);
  // }
  // tslint:disable-next-line:member-ordering
  rowTable: any;
  // tslint:disable-next-line:member-ordering
  rowTable2: any;

  // tslint:disable-next-line:member-ordering
  list: any[];
  createTask() {
    this.id.setValue(this.lastTaskId);
    this.addTask.emit(this.NewDemand.value);
    console.log(this.NewDemand.value);
    this.rowTable = this.NewDemand.value;

    this.rowTable2 = this.rowTable.CalculationData;
    console.log(this.rowTable2);
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
      }
    );
  
    // const formObj = this.NewDemand.getRawValue();
    // this.userservice.SaverequstNewDemand(formObj).subscribe(
    //   res => {
    //     this.JsonRow = res;
    //     this.AfterRow = this.JsonRow.resultStatus;
    //     this.JsonError = this.JsonRow.error;
    //     this.JsonErrorMessage = this.JsonError.errorMessage;

    //     // localStorage.setItem('requestId', this.re.result.requestId);
    //     // localStorage.setItem('branchCode', this.re.branchCode);
    //     console.log(this.JsonRow);
    //     // console.log(this.JsonRow.result.requestId);

    //     this.JsonRow = res;
    //     this.AfterRow = this.JsonRow.resultStatus;
    //     this.JsonError = this.JsonRow.error;
    //     this.JsonErrorMessage = this.JsonError.errorMessage;
    //     // console.log(this.JsonErrorMessage);
    //     if (this.JsonRow.resultStatus === 200) {
    //       this.NewDemand.reset();
    //     }
    //     this.create();
    //   }
    // );

  }


}
