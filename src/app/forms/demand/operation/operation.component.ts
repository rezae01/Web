import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TableData } from './../data-grid/table/table-data';

import { UserService } from '../../../_service/user.service';

declare var $: any;

import { Task } from '../../demand/model/task';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'],
  providers: [UserService]
})
export class OperationComponent implements OnInit {
  list: any;

  tasks: Task[] = [
    new Task(1,0,0,0,[],{}),
    // new Task(2, 8 , 5 , 53 , [] , {}),
    // new Task(3, 8 , 5 , 53 , [] , {}),
  ];

  lastTaskId: number = this.tasks[this.tasks.length - 1].id;
  // tslint:disable-next-line:no-inferrable-types
  edit: boolean = false;
  task: Task;
  addTask(tasks: Task) {
    
    this.tasks.push(tasks);
    this.lastTaskId = tasks.id + 1;
    console.log(this.lastTaskId)
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
    this.list = JSON.parse( localStorage.getItem('NewDemand'));
    // console.log(this.list);
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
