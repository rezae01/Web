import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-integration-separation',
  templateUrl: './integration-separation.component.html',
  styleUrls: ['./integration-separation.component.css']
})



export class IntegrationSeparationComponent implements OnInit {
  IntegraSeparation: any;
  public IntegraSeparationStepOne : FormGroup;
  public IntegraSeparationStep : FormGroup;
  private sub: any;
  id: number;
  id2: any;
  serchFilter:any;
  serchFilip:any;
  serch:any;
  FirstName:any = '';
  LastName:any = '';
  PhoneNumber:any = '';
  Address:any = '';
  Cityid:any = '';
  WorkDayCode:any = '';
  RdrCode:any = '';
  RdgSrl:any = '';
  BranchSrl:any = '';
  Phs:any = '';
  Amp:any = '';
  TrfCode:any = '';
  PwrCnt:any = '';
  BranchCode:any = '';
  RegionId:any = '';
  RegionName:any = '';
  CityName:any = '';
  BillId:any = '';
  list: any = '';
  BranchTypeCode:any = '';
  checked:boolean = true;
  checkedAdd:boolean = true;
  counter:number = 0;
  branchcode:any;
  getRow:any;
  re:any;
  value:any;
  city1:any;
  city:any;
  region:any;
  result:any;
  CalculationData: Array<any> = [];


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
  clickSelected(checked){ 
    if(checked.target.checked){
      this.counter = this.counter + 1;
      if(this.counter == 0 ){
        this.checkedAdd = true;
        this.checked = true;
      }
      if (this.counter == 1){
        this.checkedAdd = true;
        this.checked = false;
      }
      if (this.counter > 1){
        this.checkedAdd = false;
        this.checked = true;
      }
    } else{
      this.counter = this.counter - 1;
      this.checked = true;
      this.checkedAdd = true;
      if(this.counter == 0 ){
        this.checked = true;
        this.checkedAdd = true;
      }
      if(this.counter == 1 ){
        this.checked = false;
        this.checkedAdd = true;
      }
    }
  }
  addRow(data){
    localStorage.setItem('branchcode',data);
    console.log(localStorage.getItem('branchcode'));
  }
  responce(){
    let data = (localStorage.getItem("branchcode"));
    this.userservice.paramterBeranchCode(data).subscribe(
      post=>{
        this.branchcode = post;
        this.getRow = this.branchcode.result;
        this.branchcode=this.getRow.branchTypeCode;
        console.log(this.getRow.branchTypeCode);
      }
    ); 

  }
  private data:Array<any> = [];
  constructor(private http: Http,public  userservice: UserService,private fb: FormBuilder) {
//  console.log(JSON.stringify(this.data));
    this.length = this.data.length;
    // console.log(this.columns);
    // this.sub = this.route.params.subscribe(params => {
      //  this.id = +params['id'];
      //  this.id2= +params['id2'];
      // alert(this.id)

      //  console.log(this.id2);
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
    //  );
    this.userservice.getcity().subscribe(
      post => {
        this.region = post;
        this.result=this.region.result;
        // console.log(this.result); //.result
      }
    );
   }
   setValue(value: string) {
    this.value = value;
    // alert(value)
    this.userservice.getcitylvl2(this.value).subscribe(
      post=>{
        this.city1 = post;
        this.city=this.city1.result;
        // console.log(this.city);
      }
    );
  }
  public ngOnInit():void {
    
    this.onChangeTable(this.config);
    // this.IntegraSeparation = this.fb.group({
    //   BranchCode: [null],
    //   FormId:[1028],
    // })
    // this.IntegraSeparationStep = this.fb.group({
    //   BranchCode: [null],
    // });
    this.IntegraSeparationStepOne = this.fb.group({
      SourceBranchCode: [null , Validators.compose([Validators.required])],
      FormId: [''],
      ChangePhs :[null, Validators.compose([Validators.required])], // فاز
      ChangeAmp :[null, Validators.compose([Validators.required])],// آمپر
      ChangeTrfHCode :[null, Validators.compose([Validators.required])], //سر تعرفه 
      ChangePwrCnt :[null, Validators.compose([Validators.required])],// قدرت قرار دادی
      ChangePwrIcn :[null, Validators.compose([Validators.required])],// قدرت مجاز پروانه
      ChangeFmlCode :[null, Validators.compose([Validators.required])],// تعداد خانوار
      ChangeTrfType :[null, Validators.compose([Validators.required])], // نوع انشعاب
      ChangeTrfCode :[null, Validators.compose([Validators.required])],
      Dm: this.fb.array([this.initItemRows()]),
    });
  }
  initItemRows() {
    return this.fb.group({
      Count: [],
      Phs: [],
      Amp: [],
      TrfHCode: [],
      PwrCnt: [],
      PwrIcn: [],
      TrfType: [],
      FmlCode: [],
      BranchTypeCode: [],
      VoltCode: [],
    });
  }
  // test(){
  //   return this.fb.group({
  //       BranchMojaverLeft:new FormControl(),
  //       BranchMojaverRight: new FormControl()
  //   })
  // }
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



  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
    this.userservice.serachByIntegrationSeparation(this.serchFilter).subscribe(
      post => {
        this.serchFilip = post;
        this.serch =JSON.parse( JSON.stringify(this.serchFilip.result));
        this.FirstName = this.serch["firstName"];
        this.LastName = this.serch["lastName"];
        this.PhoneNumber = this.serch["phoneNumber"];
        this.Address = this.serch["address"];
        this.Cityid = this.serch["cityId"];
        this.CityName = this.serch["cityName"];
        this.WorkDayCode = this.serch["workDayCode"];
        this.RdrCode = this.serch["rdrCode"];
        this.RdgSrl = this.serch["rdgSrl"];
        this.BranchSrl = this.serch["branchSrl"];
        this.Phs = this.serch["phs"];
        this.Amp = this.serch["amp"];
        this.TrfCode = this.serch["trfCode"];
        this.PwrCnt = this.serch["pwrCnt"];
        this.BranchCode = this.serch["branchCode"];
        this.BillId = this.serch["BillId"];
        this.RegionId = this.serch["regionId"];
        this.RegionName = this.serch["regionName"];
        this.getdata(this.serchFilip.result);
        console.log(this.serch);
      }
    );
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
  public onCellClick(data: any): any {
    console.log(data);
  }
  IntegraSeparationModalTest(){
    console.log(this.IntegraSeparation);
    console.log(this.IntegraSeparation.value);
  }
  SendCalculationSepration(){
    const formObj = this.IntegraSeparation.getRawValue();
    this.userservice.CalculationSepration(formObj).subscribe(res => {this.re = res; console.log(res); });
  }
  }
