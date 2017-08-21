import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { UserService } from '../../../../_service/user.service';
import { SplitInformation } from '../../../demand/model/SplitInformation';
declare var $: any;

@Component({
  selector: 'app-table-existing',
  templateUrl: './table-existing.component.html',
  styleUrls: ['./table-existing.component.css'],
  providers: [UserService]
})
export class TableExistingComponent implements OnInit {
    @Input() SplitInformations: SplitInformation[];
    @Output() SplitInformationsChange = new EventEmitter();


    constructor(public userservice: UserService) { }
    public ngOnInit() {

    }
    deleteTask(SplitInformations: SplitInformation) {
        this.SplitInformations.splice(this.SplitInformations.indexOf(SplitInformations) , 1);
        this.SplitInformationsChange.emit(this.SplitInformations);
    }
}
