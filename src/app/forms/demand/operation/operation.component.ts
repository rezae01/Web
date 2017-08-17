import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TableData } from './../data-grid/table/table-data';

import { UserService } from '../../../_service/user.service';

declare var $: any;

import { Task, CalculationData } from '../../demand/model/task';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'],
  providers: [UserService]
})
export class OperationComponent implements OnInit {
  list: any;
<<<<<<< HEAD
  lastTaskId: number = 1;
  tasks: Task[] = [];
  CalculationData: CalculationData[] = [];
=======
  public sendform:FormGroup;

  tasks: Task[] = [
    new Task(1,0,0,0,[],{}),
    // new Task(2, 8 , 5 , 53 , [] , {}),
    // new Task(3, 8 , 5 , 53 , [] , {}),
  ];

  lastTaskId: number = this.tasks[this.tasks.length - 1].id;
  // tslint:disable-next-line:no-inferrable-types
>>>>>>> 3f594018c363adc7f701a9d8a7e50ca21a486c61
  edit: boolean = false;
  task: Task;


  rowTable: any;
  rowTable2: any;
  addTask(tasks: Task, CalculationDatas: CalculationData) {
    this.tasks.push(tasks);
    this.lastTaskId = tasks.id + 1;
    // console.log(this.lastTaskId);
    this.rowTable = this.tasks;
    this.rowTable2 = this.rowTable.CalculationData;
    this.lastTaskId = this.rowTable2.id2 + 1;
    console.log(this.lastTaskId);
  }
  

  showEditTask(tasks: Task) {
    // console.log(tasks);
    this.task = tasks;
    // console.log(this.task)
    this.edit = true;
  }
  showTask() {
    this.edit = false;
  }
<<<<<<< HEAD
   
  constructor(public userservice: UserService) {
    // this.list = JSON.parse( localStorage.getItem('NewDemand'));
    //  console.log(this.lastTaskId); // console.log(this.list);
    // this.lastTaskId = this.tasks[this.tasks.length - 1].id;
    let list: string[] = [];

    // json..forEach(element => {
    //     list.push(element.Id);
    // });
=======
  constructor(
    private fb: FormBuilder,
    public userservice: UserService) {
    this.list = JSON.parse( localStorage.getItem('NewDemand'));
    // console.log(this.list);
>>>>>>> 3f594018c363adc7f701a9d8a7e50ca21a486c61
  }
  value:any;
  city1:any;
  city:any;
  public FinalSubmit:FormGroup;


  public ngOnInit() {
    this.FinalSubmit = this.fb.group({
      RequesterId: [1],
      FormId: [2]
    })
  }
  JsonRow: any;
  // finalSubmit(){
  //   console.log(this.FinalSubmit.value);
  //   const formObj = this.FinalSubmit.getRawValue();
  //   this.userservice.SaveSubmit(formObj).subscribe(
  //     res => {
  //       this.JsonRow = res;
  //     }
  //   );
  // }
  SaveSubmit(){
    console.log(this.FinalSubmit.value);
    const formObj = this.FinalSubmit.getRawValue();
    console.log(formObj)
    this.userservice.SaveSubmit(formObj).subscribe(
      res => {
        this.JsonRow = res;
      }
    );
  }
}
