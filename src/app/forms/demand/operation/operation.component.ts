import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
  lastTaskId: number = 1;
  tasks: Task[] = [];
  CalculationData: CalculationData[] = [];
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
   
  constructor(public userservice: UserService) {
    // this.list = JSON.parse( localStorage.getItem('NewDemand'));
    //  console.log(this.lastTaskId); // console.log(this.list);
    // this.lastTaskId = this.tasks[this.tasks.length - 1].id;
    let list: string[] = [];

    // json..forEach(element => {
    //     list.push(element.Id);
    // });
  }
  value:any;
  city1:any;
  city:any;
  SaveSubmit(value: string){
    this.value = value;
    this.userservice.SaveSubmit(1).subscribe(
      post => {
        this.city1 = post;
        this.city = this.city1.result;
      }
    );
  }

  public ngOnInit() {
  
  }

}
