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
  public IntegraSeparationStepOne: FormGroup;
  public IntegraSeparationStep: FormGroup;
  private sub: any;
  id: number;
  id2: any;
  serchFilter: any;
  serchFilip: any;
  serch: any;
  FirstName: any = '';
  LastName: any = '';
  PhoneNumber: any = '';
  Address: any = '';
  Cityid: any = '';
  WorkDayCode: any = '';
  RdrCode: any = '';
  RdgSrl: any = '';
  BranchSrl: any = '';
  Phs: any = '';
  Amp: any = '';
  TrfCode: any = '';
  PwrCnt: any = '';
  BranchCode: any = '';
  RegionId: any = '';
  RegionName: any = '';
  CityName: any = '';
  BillId: any = '';
  list:  any = '';
  BranchTypeCode: any = '';
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


  constructor(private http: Http,public  userservice: UserService,private fb: FormBuilder) {

    this.userservice.getcity().subscribe(
      post => {
        this.region = post;
        this.result = this.region.result;
      }
    );
   }
   setValue(value: string) {
    this.value = value;
    this.userservice.getcitylvl2(this.value).subscribe(
      post => {
        this.city1 = post;
        this.city = this.city1.result;

      }
    );
  }
  public ngOnInit(): void {
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
