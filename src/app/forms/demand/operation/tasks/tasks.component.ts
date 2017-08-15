import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { UserService } from '../../../../_service/user.service';
import { Task } from '../../../demand/model/task';
declare var $: any;

// export class Task {
//     id: number;
// }
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [UserService]
})
export class TasksComponent implements OnInit {

@Input() tasks: Task[];
@Output() tasksChange = new EventEmitter();
@Output() taskEdit = new EventEmitter();

    constructor(public userservice: UserService) { }
    public ngOnInit() {

    }

    deleteTask(task: Task) {
        this.tasks.splice(this.tasks.indexOf(task) ,  1);
        this.tasksChange.emit(this.tasks);
        // console.log(task);
    }
    editTask(tasks: Task) {
        this.taskEdit.emit(tasks);
        // console.log(tasks)
        // this.taskEdit;
    }
// tslint:disable-next-line:eofline
}