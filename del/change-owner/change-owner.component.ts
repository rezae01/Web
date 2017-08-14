import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PagerService } from './services/pager.service';
import {UserService} from '../../_service/user.service'
@Component({
  selector: 'app-change-owner',
  templateUrl: './change-owner.component.html',
  styleUrls: ['./change-owner.component.scss'],
  providers: [ PagerService , UserService]
})
export class ChangeOwnerComponent implements OnInit {
  grid: any;
  public ChangeOwner: FormGroup;
  constructor(private fb: FormBuilder,private pagerService: PagerService ,public  userservice: UserService) {
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
  private allItems: any[];

  // pager object
  pager : any = {};

  // paged items
  pagedItems: any[];
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
