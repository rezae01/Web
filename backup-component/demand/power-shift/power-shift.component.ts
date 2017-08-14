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
      SerachRes: ['', Validators.compose([Validators.required])],
      Reason: ['', Validators.compose([Validators.required])],
      Tariff: ['', Validators.compose([Validators.required])],
      Voltage: ['', Validators.compose([Validators.required])],
      Common: ['', Validators.compose([Validators.required])],
      phase: ['', Validators.compose([Validators.required])],
      Amp: ['', Validators.compose([Validators.required])],
      power: ['', Validators.compose([Validators.required])],
      demand: ['', Validators.compose([Validators.required])],
      checkReus: ['', Validators.compose([Validators.required])],
      checkTwo: ['', Validators.compose([Validators.required])],
      count: ['', Validators.compose([Validators.required])],
      countTwe: ['', Validators.compose([Validators.required])],
      BirthDate: ['', Validators.compose([Validators.required])],
    });
  }

  PowerShiftRes(){
    console.log(this.PowerShift);
    console.log(this.PowerShift.value);
  }
  SaveRequstPowerShiftRes(){
    const formObj = this.PowerShift.getRawValue();
    this.userservice.SaveRequstPowerShiftRes(formObj).subscribe(res => {this.re = res; console.log(res); });
  }
}
