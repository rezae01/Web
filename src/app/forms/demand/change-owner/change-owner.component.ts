import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {UserService} from './../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-owner',
  templateUrl: './change-owner.component.html',
  styleUrls: ['./change-owner.component.css'],
  providers: [UserService]
})
export class ChangeOwnerComponent implements OnInit {
  BranchCode:number;
  FormName:number;
  FormId:number;

  NationalCode: string = '';
  FirstName: string = '';
  LastName: string = '';
  FatherName: string = '';
  serch:any;
  serchFilter:any;
  serchFilip:any;
  private sub: any;
  re:any;
  public rows:Array<any> = [];
  public columns:Array<any> = [];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  grid:any;
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  private data:Array<any> = [];
  public ChangeOwner: FormGroup;
  public ChangeOwnerSearch: FormGroup;

  JsonRow: any;
  AfterRow: any;
  JsonError: any;
  JsonErrorMessage: any;

  constructor(
    private fb: FormBuilder,
    public  userservice: UserService,
    private _service: NotificationsService,
  ) {
    this.length = this.data.length;
  }
  ngOnInit() {
    this.onChangeTable(this.config);
    this.ChangeOwner = this.fb.group({
      FormId:[1025],
      FormName:[3],
      BranchCode:[],
      NationalCode: [null, Validators.compose([Validators.required])],
      FirstName: [null, Validators.compose([Validators.required])],
      LastName: [null, Validators.compose([Validators.required])],
      FatherName: [null, Validators.compose([Validators.required])],
    });
  }

  create() {
    if (this.JsonRow.resultStatus === 200) {
      this._service.success(
          'کاربر گرامی',
          this.JsonErrorMessage,
          {
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              maxLength: 200
          }
      );
    } else if (this.JsonRow.resultStatus === 400) {
      this._service.error(
          'کاربر گرامی',
          this.JsonErrorMessage,
          {
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              maxLength: 200
          }
      );
    } else if (this.JsonRow.resultStatus === 300) {
      this._service.warn(
          'کاربر گرامی',
          this.JsonErrorMessage,
          {
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
              maxLength: 200
          }
      );
    }
  }
  ChangeOwnerRes(){
    console.log(this.ChangeOwner);
    console.log(this.ChangeOwner.value);
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
  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
      this.userservice.serachByPassOwner(this.serchFilter).subscribe(
      post => {
        this.JsonRow = post;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        if (this.JsonRow.resultStatus === 200) {
          this.serch =JSON.parse( JSON.stringify(this.serchFilip.result));
          this.BranchCode = this.serch["branchCode"];
          this.NationalCode = this.serch["nationalCode"];
          this.FirstName = this.serch["firstName"];
          this.LastName = this.serch["lastName"];
          this.FatherName = this.serch["fatherName"];
          console.log(this.serch);
        } else{
          this.ChangeOwner.reset();
        }
        this.create();
       }
    );
  }
  SaveRequstChangeOwner(){
    const formObj = this.ChangeOwner.getRawValue();
    this.userservice.SaveRequstOwner(formObj).subscribe(
      res => {
        this.JsonRow = res;
        this.AfterRow = this.JsonRow.resultStatus;
        this.JsonError = this.JsonRow.error;
        this.JsonErrorMessage = this.JsonError.errorMessage;
        console.log(this.JsonErrorMessage);
        this.create();
      }
    );
  }
}
