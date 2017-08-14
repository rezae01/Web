import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PagerService } from './services/pager.service';
import { UserService } from '../../_service/user.service';

// import { TableComponent } from 'angular2-datagrid/src/app/demo';
// import { DynFieldComponent } from '../../component/dyn-field/dyn-field.component';
@Component({
  selector: 'app-listrequst',
  templateUrl: './submit-demand.component.html',
  styleUrls: ['./submit-demand.component.css'],
  // providers: [ PagerService , UserService],
  // encapsulation: ViewEncapsulation.None
})

export class SubmitDemandComponent implements OnInit {
  grid: any;


  // Initialized to specific date (09.10.2018). It is also possible to set initial
  // date value using the selDate attribute.
  private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  constructor(private http: Http, private pagerService: PagerService ,public  userservice: UserService ) {
     //
    //  this.userservice.GETgridculomens().subscribe(
    //    post => {
    //      this.grid = post;
    //        console.log(post) }
    //  );
  }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager : any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    // get dummy data
    // this.http.get('https://jsonplaceholder.typicode.com/photos')
    //   .map((response: Response) => response.json())
    //   .subscribe(data => {
    //     // set items to json response
    //     this.allItems = data;
    //
    //     // initialize to page 1
    //     this.setPage(1);
    //   });
  }

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
