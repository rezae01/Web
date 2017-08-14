import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  providers: [UserService]
})
export class OperationComponent implements OnInit {

  constructor(public userservice: UserService) {

    // this.userservice.GETgridculomens().subscribe(
    //   post => {
    //     this.grid = post;
    //       // console.log(post);
    //   }
    // );
   }

  ngOnInit() {
  }
}
