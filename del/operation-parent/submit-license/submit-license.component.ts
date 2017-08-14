import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from "ng2-datepicker-jalali/persian/ngb-calendar-persian";
import {NgbDatepickerI18nPersian} from "ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian";

import { UserService } from '../../../../_service/user.service';

declare var $: any;

@Component({
  selector: 'submit-license',
  templateUrl: './submit-license.component.html',
  styleUrls: ['./submit-license.component.scss'],
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
  date: {year: number, month: number};

  constructor(private fb : FormBuilder,calendar: NgbCalendar, config: NgbDatepickerConfig, public  userservice: UserService) {
    this.today = calendar.getToday();
   }

  ngOnInit() {
    this.submitLicense = this.fb.group({
      test: [null, Validators.compose([Validators.required])],
      test2: [null, Validators.compose([Validators.required])],
      test3: [null, Validators.compose([Validators.required])],
      test4: [null, Validators.compose([Validators.required])],
      test5: [null, Validators.compose([Validators.required])],
      test6: [null, Validators.compose([Validators.required])],
      test7: [null, Validators.compose([Validators.required])],
      test8: [null, Validators.compose([Validators.required])],
      test9: [null, Validators.compose([Validators.required])],
      test10: [null, Validators.compose([Validators.required])],
      test11: [null, Validators.compose([Validators.required])],
      test12: [null, Validators.compose([Validators.required])],
      test13: [null, Validators.compose([Validators.required])],
      test14: [null, Validators.compose([Validators.required])],
    });
  }

}
