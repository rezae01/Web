import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-listrequst',
  templateUrl: './submit-demand.component.html',
  styleUrls: ['./submit-demand.component.css'],
  providers: [ UserService ],
  encapsulation: ViewEncapsulation.None
})

export class SubmitDemandComponent implements OnInit {

  constructor(private http: Http,public  userservice: UserService ) {
     //
    //  this.userservice.GETgridculomens().subscribe(
    //    post => {
    //      this.grid = post;
    //        console.log(post) }
    //  );
  }

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
}
