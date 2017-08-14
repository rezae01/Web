import { Component, OnInit, Output , ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-listrequst',
  templateUrl: './submit-demand.component.html',
  styleUrls: ['./submit-demand.component.css'],
  providers: [ UserService ],
  encapsulation: ViewEncapsulation.None
})

export class SubmitDemandComponent implements OnInit {
  id: any;
  id2: any;

  @Output() sub: any;

  public rows: Array<any> = [];
  public columns: Array<any> = [];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  grid: any;
  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<any> = []; //TableData;

  // constructor(private route: ActivatedRoute) {
  //    this.sub = this.route.params.subscribe(params => {
  //      this.id = +params['id'];
  //   });
  //  }

  constructor(
    private http: Http,
    public  userservice: UserService,
    private route: ActivatedRoute,
    
  ) {
    this.length = this.data.length;
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = + params['id'];
    //   alert(JSON.stringify(this.id));
    // });

    this.userservice.GETgridculomens(this.id).subscribe(
      post => {
      this.columns = post;
        console.log(post);
      }

    );
    this.userservice.GETgridculomensGrid(this.id).subscribe(
      post => {
        this.data = post;
        console.log(post);
      }
    );
  }



// پاک کردن لوکان استوریج گرید انشعاب موجود
  removeLocal(){
    localStorage.removeItem('grid');
  }




  
  ngOnInit():void {
    this.onChangeTable(this.config);
  }
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  // ngOnInit() {
  //   this.onChangeTable(this.config);
  //   // get dummy data
  //   this.http.get('https://jsonplaceholder.typicode.com/photos')
  //     .map((response: Response) => response.json())
  //     .subscribe(data => {
  //       // set items to json response
  //       this.allItems = data;
    
  //       // initialize to page 1
  //       this.setPage(1);
  //     });
  // }

}
