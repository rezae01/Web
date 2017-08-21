import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TableData } from './../data-grid/table/table-data';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';


declare var $: any;

// import { Task, CalculationData } from '../../demand/model/task';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'],
  providers: [UserService]
})
export class OperationComponent implements OnInit {
  list: any;
  lastTaskId: number = 1;
  // tasks: Task[] = [];
  // CalculationData: CalculationData[] = [];
  public sendform: FormGroup;


  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  // lastTaskId: number = this.tasks[this.tasks.length - 1].id;
  // tslint:disable-next-line:no-inferrable-types

  edit: boolean = false;
  // task: Task;
  value: any;
  city1: any;
  city: any;
  public FinalSubmit: FormGroup;

  rowTable: any;
  rowTable2: any;
  // addTask(tasks: Task, CalculationDatas: CalculationData) {
  //   this.tasks.push(tasks);
  //   this.lastTaskId = tasks.id + 1;
  //   // console.log(this.lastTaskId);
  //   this.rowTable = this.tasks;
  //   this.rowTable2 = this.rowTable.CalculationData;
  //   this.lastTaskId = this.rowTable2.id2 + 1;
  //   console.log(this.lastTaskId);
  // }

  // showEditTask(tasks: Task) {
    // console.log(tasks);
    // this.task = tasks;
    // console.log(this.task)
    // this.edit = true;
  // }
  showTask() {
    this.edit = false;
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
  constructor(
    private fb: FormBuilder,
    public userservice: UserService,
    private _service: NotificationsService,
  ) {
    this.list = JSON.parse( localStorage.getItem('NewDemand'));
    // console.log(this.list);
  }



  public ngOnInit() {
    this.FinalSubmit = this.fb.group({
      RequesterId: [2],
      FormId: [2]
    });
  }



  SaveSubmit() {
    console.log(this.FinalSubmit.value);
    const formObj = this.FinalSubmit.getRawValue();
    this.userservice.SaveSubmit(formObj).subscribe(
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
        this.create();
      }
    );
  }
}
