import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { UserService } from '../../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

// import { Task } from '../../../demand/model/task';
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
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(changes);
  //   // this.TrfType.setValue(changes.tasks.currentValue.TrfType);
  // }

//   tasks: Task[];
//   @Output() addTask = new EventEmitter();
//   @Input() lastTaskId: number;
  // @Input() task: Task;


  id = new FormControl('');
  public EditNewDemand: FormGroup;
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

  public ngOnInit() {
    this.EditNewDemand = this.fb.group({
      id: this.id,
      RequesterId: new FormControl(''),
      FormId: new FormControl(9),
      ProcessId: new FormControl(1),
      CalculationData: this.fb.array([this.initItemRows()]),
    });
  }
  initItemRows() {
    return this.fb.group({
      TrfType: new FormControl('',Validators.required),
      Phs: new FormControl('',Validators.required),
      TrfHCode: new FormControl('',Validators.required),
      Count: new FormControl('',Validators.required),
      PwrIcn: new FormControl('',Validators.required),
      PwrCnt: new FormControl('',Validators.required),
      VoltCode: new FormControl('',Validators.required),
      Amp: new FormControl('',Validators.required),
      FmlCode: new FormControl(''),
    });
  }
  AddDemand() {
      const control = <FormArray>this.EditNewDemand.controls['CalculationData'];
      control.push(this.initItemRows());
  }
  RemoveDemand(i: number) {
        const control = <FormArray>this.EditNewDemand.controls['CalculationData'];
        control.removeAt(i);
  }
  resetForm() {
    this.EditNewDemand.reset();
    // localStorage.removeItem('EditNewDemand');
  }

  SaveRequst() {
    const formObj = this.EditNewDemand.getRawValue();
    this.userservice.SaverequstNewDemand(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;

        // localStorage.setItem('requestId', this.re.result.requestId);
        // localStorage.setItem('branchCode', this.re.branchCode);
        // console.log(this.JsonRow);
        // console.log(this.JsonRow.result.requestId);

        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        // console.log(this.JsonErrorMessage);
        if (this.JsonRow.resultStatus === 200) {
          this.EditNewDemand.reset();
        }
        this.create();
      }
    );
  }

  edit() {
    
  }

}
