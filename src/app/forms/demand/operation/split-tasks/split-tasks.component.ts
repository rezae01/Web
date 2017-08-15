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
  selector: 'app-split-tasks',
  templateUrl: './split-tasks.component.html',
  styleUrls: ['./split-tasks.component.css'],
  providers: [UserService]
})
export class SplitTasksComponent implements OnInit {
    ngOnInit() {

    }
}