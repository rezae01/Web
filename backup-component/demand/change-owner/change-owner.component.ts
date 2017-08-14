import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {UserService} from './../../../_service/user.service';

@Component({
  selector: 'app-change-owner',
  templateUrl: './change-owner.component.html',
  styleUrls: ['./change-owner.component.scss'],
  providers: [UserService]
})
export class ChangeOwnerComponent implements OnInit {

  public ChangeOwner: FormGroup;
  constructor(private fb: FormBuilder,public  userservice: UserService) {
    // this.userservice.GETgridculomens().subscribe(
    //   post => {
    //     this.grid = post;
    //       // console.log(post);
    //   }
    // );
  }

  ngOnInit() {
    this.ChangeOwner = this.fb.group({
      SerachRes: [null, Validators.compose([Validators.required])],
      NationalCode: [null, Validators.compose([Validators.required])],
      fatherName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
    });
  }
}
