import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { NotificationsService } from 'angular2-notifications';

import { CalculationData } from '../../../demand/model/new-demand';

declare var $: any;

@Component({
  selector: 'app-new-demand-table',
  templateUrl: './new-demand-table.component.html',
  styleUrls: ['./new-demand-table.component.css'],
})

export class NewDemandTableComponent implements OnInit {

    @Input() CalculationDatas: CalculationData[];
    @Output() CalculationDatasChange = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private _service: NotificationsService,
    ) {
    }
    public ngOnInit() {


    }

    deleteTask(CalculationDatas: CalculationData) {
        this.CalculationDatas.splice(this.CalculationDatas.indexOf(CalculationDatas) , 1);
        this.CalculationDatasChange.emit(this.CalculationDatas);
    }

}
