import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from "ng2-datepicker-jalali/persian/ngb-calendar-persian";
import {NgbDatepickerI18nPersian} from "ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian";

import { UserService } from '../../../_service/user.service';

declare var $: any;

@Component({
  selector: 'app-power-shift',
  templateUrl: './power-shift.component.html',
  styleUrls: ['./power-shift.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class PowerShiftComponent implements OnInit {
  serchFilter:any;
  serchFilip:any;
  serch:any;
  FirstName:any;
  LastName:any;
  FixedTel:any;
  Adress:any;
  Cityid:any;
  CityName:any;
  WorkDayCode:any;
  RdrCode:any;
  RdgSrl:any;
  BranchSrl:any;
  Phs:any;
  Amp:any;
  TrfCode:any;
  PwrCnt:any;
  BranchCode:any;
  RegionId:any;
  BillId:any;
  TrfHCode:any;
  PhoneNumber:any;

  public PowerShift: FormGroup;

  private today: NgbDateStruct;
  model: NgbDateStruct;

  submitted: boolean;
  re: any;
  date: {year: number, month: number};
  constructor(private fb: FormBuilder ,calendar: NgbCalendar, config: NgbDatepickerConfig, public  userservice: UserService) {
    this.today = calendar.getToday();

    this.submitted = false;
    // this.userservice.GETgridculomens().subscribe(
    //   post => {
    //     this.grid = post;
    //       // console.log(post);
    //   }
    // );
  }


  ngOnInit() {

    $(function(){
      $('#checkboxOff').addClass('disabled-pointer').parent().addClass('not-allowed');
      $('#changeDis input').attr('disabled', true);
      $('#checkTwo').click(function(){
        if($('#checkTwo').is(':checked') || $('#checkTwo').prop('checked')){
          $('#checkboxOff').removeClass('disabled-pointer').parent().removeClass('not-allowed');
          $('#changeDis input').removeAttr('disabled', false);
        }else{
          $('#checkboxOff').addClass('disabled-pointer').parent().addClass('not-allowed');
          $('#changeDis input').attr('disabled', true);
        }
      });
    })



    this.PowerShift = this.fb.group({
      BranchCode: ['' , Validators.compose([Validators.required])],
      FormId:[1027],
      FormName:[1],
      Reason: ['', Validators.compose([Validators.required])],
      TrfHcode: ['', Validators.compose([Validators.required])],
      VoltCode: ['', Validators.compose([Validators.required])],
      BranchTypeCode: ['', Validators.compose([Validators.required])],
      Phs: ['', Validators.compose([Validators.required])],
      Amp: ['', Validators.compose([Validators.required])],
      PwrCnt: ['', Validators.compose([Validators.required])],
      PwrIcn: ['', Validators.compose([Validators.required])],
      checkReus: [null],
      checkTwo: [null],
      count: [null],
      countTwe: [null],
      BirthDate: [null],
    });
  }
  serachByPassCodeAndBillId(searchTerm: HTMLInputElement) {
    this.serchFilter = searchTerm.value;
      this.userservice.serachByPassPwr(this.serchFilter).subscribe(
      post => {
        this.serchFilip = post;
        this.serch =JSON.parse( JSON.stringify(this.serchFilip.result));
        this.FirstName = this.serch["firstName"];
        this.LastName = this.serch["lastName"];
        this.PhoneNumber = this.serch["phoneNumber"];
        this.Adress = this.serch["address"];
        this.Cityid = this.serch["cityId"];
        this.CityName = this.serch["cityName"];
        this.WorkDayCode = this.serch["workDayCode"];
        this.RdrCode = this.serch["rdrCode"];
        this.RdgSrl = this.serch["rdgSrl"];
        this.BranchSrl = this.serch["branchSrl"];
        this.Phs = this.serch["phs"];
        this.Amp = this.serch["amp"];
        this.TrfCode = this.serch["trfCode"];
        this.TrfHCode = this.serch["trfHCode"]
        this.PwrCnt = this.serch["pwrCnt"];
        this.BranchCode = this.serch["branchCode"];
        this.BillId = this.serch["BillId"];
        this.RegionId = this.serch["regionName"];
        console.log(this.serch);
       }
     );
  }
  PowerShiftRes(){
    console.log(this.PowerShift);
    console.log(this.PowerShift.value);
  }
  resetForm(){
    this.PowerShift.reset();
  }
  SaveRequstPowerShiftRes(){
    const formObj = this.PowerShift.getRawValue();
    this.userservice.SaveRequstPowerShiftRes(formObj).subscribe(res => {this.re = res; console.log(res); });
  }
}
