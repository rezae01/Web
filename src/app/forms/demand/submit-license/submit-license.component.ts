import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from "ng2-datepicker-jalali/persian/ngb-calendar-persian";
import {NgbDatepickerI18nPersian} from "ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian";

import { UserService } from '../../../_service/user.service';
import './../../../../assets/javascript/jquery.tosrus.all.min.js';
import './../../../../assets/css/jquery.tosrus.all.css';

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

declare var $: any;

@Component({
  selector: 'app-submit-license',
  templateUrl: './submit-license.component.html',
  styleUrls: ['./submit-license.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class SubmitLicenseComponent implements OnInit {
  public submitLicense: FormGroup;


  private today: NgbDateStruct;
  model: NgbDateStruct;
  modelOne: NgbDateStruct;
  modelTwo: NgbDateStruct;
  modelThree: NgbDateStruct;
  modelFour: NgbDateStruct;
  list:any;
  date: {year: number, month: number};

  // uploader: FileUploader = new FileUploader({
  //   url: URL,
  //   isHTML5: true
  // });






  
  test:any;
    id: number;
  id2: any;

  private sub: any;

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
  // hasBaseDropZoneOver = false;
  // hasAnotherDropZoneOver = false;

  // fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }
  //
  // fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }
  region:any;
  result:any;
  mk:any;
  mkTwe:any;
  constructor(private fb : FormBuilder,calendar: NgbCalendar, config: NgbDatepickerConfig, public  userservice: UserService) {
    this.today = calendar.getToday();
    // console.log(JSON.stringify(this.data));
    this.length = this.data.length;
    this.userservice.GetParameter().subscribe(
      post => {
        this.region = post;
        this.result=this.region.result;
        // console.log(this.result); //.result
      }
    );
    this.userservice.GetParameterTwo().subscribe(
      post => {
        this.mk = post;
        this.mkTwe = this.mk.result;
        // console.log(this.mkTwe); //.result
      }
    );
    // console.log(this.columns);
    // this.sub = this.route.params.subscribe(params => {
      //  this.id = +params['id'];
      //  this.id2= +params['id2'];
      // alert(this.id)

      // console.log(this.id2);
    // });

    // this.userservice.GETgridculomens().subscribe(
    //   post=>{
    //   this.columns=post;
    //     console.log(post);
    //   }

    // );
    // this.userservice.GETgridculomensGrid().subscribe(
    //   post => {
    //     this.data = post;
    //     console.log(post);
    //   }
    // );
   }

  ngOnInit() {

    this.onChangeTable(this.config);
    $(function(){
      $('#example-1 a').tosrus({
					buttons: 'inline',
					pagination	: {
						add			: true,
						type		: 'thumbnails'
					}
				});
    })
      

    this.submitLicense = this.fb.group({
      RequestId: [null, Validators.compose([Validators.required])],
      BranchId: [null, Validators.compose([Validators.required])],
      AuthorizationNum: [null, Validators.compose([Validators.required])],
      AuthorizationIssueDate: [null, Validators.compose([Validators.required])],
      AuthorizationExpDate: [null, Validators.compose([Validators.required])],
      AuthorizationIssuer: [null, Validators.compose([Validators.required])],
      AuthorizationType: [null, Validators.compose([Validators.required])],
      LetterNum: [null, Validators.compose([Validators.required])],
      DocumentType: [null, Validators.compose([Validators.required])],
      NationalCode: [null, Validators.compose([Validators.required])],
      Amper: [null, Validators.compose([Validators.required])],
      Phase: [null, Validators.compose([Validators.required])],
    });
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
  re:any;
  re1:any;
  re1level2:any;
  re1level2Row:any;
  change:any;
  public onCellClick(data: any): any {
    console.log(data);
  }
  getdata(data: any){
    let data1 :any=data;
    let other = []; // your other array...
    let temp=[];
    temp=JSON.parse( localStorage.getItem('grid'));
    if( temp !=null){
      other= JSON.parse( localStorage.getItem('grid'));
    }
    other.push(data1);
    localStorage.setItem('grid',JSON.stringify( other));
    this.list=JSON.parse( localStorage.getItem('grid'));
    console.log(this.list);
    // data1.map(item => {
    //     return {
    //         courseid: item.firstName,
    //         name: item.lastName
    //     }
    // }).forEach(item => other.push(item));
    // localStorage.setItem('test',JSON.stringify(other));
    // console.log(localStorage.getItem('test'));
  }
  SaveRequstSubmitLicense(){
    const formObj = this.submitLicense.getRawValue();
    this.userservice.SaveRequstSubmitLicense(formObj).subscribe(
      res => {
        this.re = res; 
        this.re1= this.re.resultStatus;

        // localStorage.setItem("test", JSON.stringify(this.re));
        console.log(this.re1);

        this.re1level2 = this.re.error;
        this.re1level2Row = this.re1level2.errorMessage;
        // if( this.re1 == 400){
        //   this.change = true;
        // }
        // console.log(this.re1);//.resultStatus///this.re1.error.errorMessage
        // console.log(this.re1level2Row);//.resultStatus
        // console.log(this.re);
      }
      // ,
      // error => {
      //   this.err = error;
      //    console.log(this.err);
      // }
    );
  }
  SendsubmitLicense(){
    console.log(this.submitLicense.value);
  }

}
