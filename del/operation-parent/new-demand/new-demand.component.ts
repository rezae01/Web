import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from "ng2-datepicker-jalali/persian/ngb-calendar-persian";
import {NgbDatepickerI18nPersian} from "ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian";

import { UserService } from '../../../../_service/user.service'; 

declare var $: any;
@Component({
  selector: 'new-demand',
  templateUrl: './new-demand.component.html',
  styleUrls: ['./new-demand.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class NewDemandComponent implements OnInit {
  public NewDemand: FormGroup;


  private today: NgbDateStruct;
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private fb : FormBuilder,calendar: NgbCalendar, config: NgbDatepickerConfig, public  userservice: UserService) {
    this.today = calendar.getToday();

  }
  ngOnInit() {
    $(function(){
      $('.stepOne').hide();
      $('.stepTwo').hide();

      $('#tea').change(function(){
          if($('#tea').val() == 2) {
              $('.stepOne').show();
              $('.stepTwo').hide();
          } else if ($('#tea').val() == 3) {
              $('.stepTwo').show();
              $('.stepOne').hide();
          }
      });

      // $('select').find('option#stepOne').click(function () {
      //   $('.stepOne').show();
      //   $('.stepTwo').hide();
      // });
      // $('select #stepTwo').click(function(){
      //   $('.stepTwo').show();
      //   $('.stepOne').hide();
      // });
    })



    this.NewDemand = this.fb.group({
      test1: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      test2: [null, Validators.compose([Validators.required])],
      test3: [null, Validators.compose([Validators.required])],
      test4: [null],
      test5: [null, Validators.compose([Validators.required])],


//address

      addtest6: [null, Validators.compose([Validators.required])],
      addtest7: [null, Validators.compose([Validators.required])],
      addtest8: [null, Validators.compose([Validators.required])],
      addtest9: [null, Validators.compose([Validators.required])],
      addtest10: [null, Validators.compose([Validators.required])],
      addtest11: [null, Validators.compose([Validators.required])],
      addtest12: [null, Validators.compose([Validators.required])],

//address

      addtest13: [null, Validators.compose([Validators.required])],
      addtest14: [null, Validators.compose([Validators.required])],
      addtest15: [null, Validators.compose([Validators.required])],
      addtest16: [null, Validators.compose([Validators.required])],
      addtest17: [null, Validators.compose([Validators.required])],
      addtest18: [null, Validators.compose([Validators.required])],
      addtest19: [null, Validators.compose([Validators.required])],

//address

      addtest20: [null, Validators.compose([Validators.required])],
      addtest21: [null, Validators.compose([Validators.required])],
      addtest22: [null, Validators.compose([Validators.required])],
      addtest23: [null, Validators.compose([Validators.required])],
      addtest24: [null, Validators.compose([Validators.required])],
      addtest25: [null, Validators.compose([Validators.required])],
      addtest26: [null, Validators.compose([Validators.required])],

      // Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      // shomareShenasname: [null, Validators.compose([Validators.required])],
      // IssuedFrom: [null, Validators.compose([Validators.required])],
      // Gender: ['', Validators.compose([Validators.required])],
      // MobileNo: [null, Validators.compose([Validators.required])],
      // BirthDate: ['', Validators.compose([Validators.required])],
      // PostNumber: [null, Validators.compose([Validators.required])],
      // Adress: [null, Validators.compose([Validators.required])],
      // CityidLvlTwo: [null, Validators.compose([Validators.required])],
      // Cityid: [null, Validators.compose([Validators.required])],
      // FixedTel: [null, Validators.compose([Validators.required])],
    });
  }



}
