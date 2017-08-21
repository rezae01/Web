import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';
import { SplitInformation } from '../../demand/model/SplitInformation';
@Component({
  selector: 'app-existing-divisions',
  templateUrl: './existing-divisions.component.html',
  styleUrls: ['./exixting-divisions.component.css'],
  providers: [ UserService ]
})
export class ExistingDivisionsComponent implements OnInit {

  @Output() addSplitInformations = new EventEmitter();

  SplitInformations: SplitInformation[] = [
    new SplitInformation(0, '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
  ];
  SplitInformation: SplitInformation;
  lastSplitInformationId = this.SplitInformations[this.SplitInformations.length - 1].id;
  addData(SplitInformation: SplitInformation) {
    this.lastSplitInformationId = SplitInformation.id + 1;
    this.SplitInformations.push(SplitInformation);
  }

  constructor(
    private _service: NotificationsService,
    public userservice: UserService,
  ) {

  }

  ngOnInit() {

  }
}

