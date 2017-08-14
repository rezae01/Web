import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../_service/user.service';
@Component({
  selector: 'app-existing-divisions',
  templateUrl: './existing-divisions.component.html',
  styleUrls: ['./exixting-divisions.component.css'],
  providers: [UserService]
})
export class ExistingDivisionsComponent implements OnInit {
  public existing: FormGroup;
  constructor(private fb: FormBuilder ,public  userservice: UserService) {
    // this.userservice.GETgridculomens().subscribe(
    //   post => {
    //     this.grid = post;
    //       // console.log(post);
    //   }
    // );
  }
  ngOnInit() {
    this.existing = this.fb.group({
      SerachRes: [null, Validators.compose([Validators.required])],
    });
  }
  // setPage(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //     return;
  //   }
  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.allItems.length, page);
  //   // get current page of items
  //   this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
}
