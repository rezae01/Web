import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarPersian } from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import { NgbDatepickerI18nPersian } from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

import { UserService } from '../../../../_service/user.service';
import { NotificationsService } from 'angular2-notifications';

import { NewDemand , CalculationData } from '../../../demand/model/new-demand';

declare var $: any;
@Component({
  selector: 'app-form-data-demand',
  templateUrl: './form-data-demand.component.html',
  styleUrls: ['./form-data-demand.component.css'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})

export class FormDataDemandComponent implements OnInit {

    NewDemands: NewDemand[];
    CalculationDatas: CalculationData[];
    @Input() lastCalculationDataId: number;

    @Output() addCalculationDatas = new EventEmitter();

    public NewDemand: FormGroup;
    re: any;
    private today: NgbDateStruct;
    model: NgbDateStruct;
    private sub: any;
    trf: any;
    trfType: any;
    amp: any;
    Amper: any;
    TrfType: any;
    Phase: any;
    region: any;
    region1: any;
    Phs: any;
    result: any;
    city1: any;
    city: any;
    arr: any;
    requestId: any = '';
    regionName: any = '';
    cityName: any = '';
    requestDate: any = '';
    test: any;
    test1: any;
    value: any;
    value1: any;
    d: any;

    CalculationData: Array<any> = [];



    JsonRow: any;
    AfterRow: any;
    JsonError: any;
    JsonErrorMessage: any;



    t1: any;
    t2: any;

    constructor(
        private fb: FormBuilder,
        calendar: NgbCalendar,
        config: NgbDatepickerConfig,
        public  userservice: UserService,
        private _service: NotificationsService,
    ) {
        this.today = calendar.getToday();
        this.d = localStorage.getItem('requesterId');
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
    // tslint:disable-next-line:member-ordering
    id = new FormControl('');
    // tslint:disable-next-line:member-ordering
    public ngOnInit() {
        // $(function(){
        //   $('.stepOne').hide();
        //   $('.stepTwo').hide();
        //   $('#TrfCode').change(function(){
        //       if($('#TrfCode').val() == 2) {
        //         $('.stepOne').show();
        //         $('.stepTwo').hide();
        //       } else if ($('#TrfCode').val() == 3) {
        //         $('.stepTwo').show();
        //         $('.stepOne').hide();
        //       } else if ($('.hideOption').val() == 1) {
        //         $('.stepTwo').hide();
        //         $('.stepOne').hide();
        //       } else if ($('.hideOption').val() == 4) {
        //         $('.stepTwo').hide();
        //         $('.stepOne').hide();
        //       } else if ($('.hideOption').val() == 5) {
        //         $('.stepTwo').hide();
        //         $('.stepOne').hide();
        //       }
        //   });
        // });
        this.NewDemand = this.fb.group({
            RequesterId: new FormControl(1),
            FormId: new FormControl(9),
            ProcessId: new FormControl(1),
            CalculationData: this.fb.array([this.initItemRows()]),
        });
    }
    initItemRows() {
        return this.fb.group({
        // id2: this.id2;
        id: this.id,
        TrfType: new FormControl('', Validators.required),
        Phs: new FormControl('', Validators.required),
        TrfHCode: new FormControl('', Validators.required),
        TrfDetailCode: new FormControl('', Validators.required),
        Count: new FormControl('', Validators.required),
        PwrIcn: new FormControl('', Validators.required),
        PwrCnt: new FormControl('', Validators.required),
        VoltCode: new FormControl('', Validators.required),
        Amp: new FormControl('', Validators.required),
        FmlCode: new FormControl(''),
        });
    }
    AddDemand() {
        const control = <FormArray>this.NewDemand.controls['CalculationData'];
        control.push(this.initItemRows());
    }
    RemoveDemand(i: number) {
        const control = <FormArray>this.NewDemand.controls['CalculationData'];
        control.removeAt(i);
    }



    resetForm() {
        this.NewDemand.reset();
        // localStorage.removeItem('NewDemand');
    }
    SaveRequst() {
        const formObj = this.NewDemand.getRawValue();
        this.userservice.SaverequstNewDemand(formObj).subscribe(
        res => {
            this.JsonRow = res;
            this.AfterRow = this.JsonRow.resultStatus;
            this.JsonError = this.JsonRow.error;
            this.JsonErrorMessage = this.JsonError.errorMessage;

            // localStorage.setItem('requestId', this.re.result.requestId);
            // localStorage.setItem('branchCode', this.re.branchCode);
            console.log(this.JsonRow);
            // console.log(this.JsonRow.result.requestId);

            this.JsonRow = res;
            this.AfterRow = this.JsonRow.resultStatus;
            this.JsonError = this.JsonRow.error;
            this.JsonErrorMessage = this.JsonError.errorMessage;
            // console.log(this.JsonErrorMessage);
            if (this.JsonRow.resultStatus === 200) {
            this.NewDemand.reset();
            }
            this.create();
        }
        );
    }
  // tslint:disable-next-line:member-ordering
//   rowTable: any;
  // tslint:disable-next-line:member-ordering
//   rowTable2: any;

  // tslint:disable-next-line:member-ordering
//   list: any[];
//   createTask() {
//     this.id.setValue(this.lastTaskId);
//     this.addTask.emit(this.NewDemand.value);
//     console.log(this.NewDemand.value);
//     this.rowTable = this.NewDemand.value;

//     this.rowTable2 = this.rowTable.CalculationData;
//     console.log(this.rowTable2);
//     const formObj = this.NewDemand.getRawValue();
//     this.userservice.SaverequstNewDemand(formObj).subscribe(
//       res => {
//         this.JsonRow = res;
//         this.AfterRow = this.JsonRow.resultStatus;
//         this.JsonError = this.JsonRow.error;
//         this.JsonErrorMessage = this.JsonError.errorMessage;

//         // localStorage.setItem('requestId', this.re.result.requestId);
//         // localStorage.setItem('branchCode', this.re.branchCode);
//         console.log(this.JsonRow);
//         // console.log(this.JsonRow.result.requestId);

//         this.JsonRow = res;
//         this.AfterRow = this.JsonRow.resultStatus;
//         this.JsonError = this.JsonRow.error;
//         this.JsonErrorMessage = this.JsonError.errorMessage;
//         // console.log(this.JsonErrorMessage);
//         if (this.JsonRow.resultStatus === 200) {
//           this.NewDemand.reset();
//         }
//       }
//     );
//   }
    createTable() {
        this.id.setValue(this.lastCalculationDataId);
        this.addCalculationDatas.emit(this.NewDemand.value);
        console.log(this.addCalculationDatas);
        // this.NewDemand.reset();
    }

}
