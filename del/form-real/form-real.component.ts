import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from "ng2-datepicker-jalali/persian/ngb-calendar-persian";
import {NgbDatepickerI18nPersian} from "ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian";

import { UserService } from '../../_service/user.service';

@Component({
  selector: 'form-real',
  templateUrl: './form-real.component.html',
  styleUrls: ['./form-real.component.scss'],
  providers: [
    UserService,
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
  ]
})
export class FormRealComponent implements OnInit {
  re: any;
  region: any;
  value: any;
  city:any;
  serch: any;
  serchFilter: any;
  firstName:any;
  lastName: any;
  fatherName: any;
  requesterType:any;
  email: any;
  adress:any;
  issuedFrom: any;
  gender:any;
  mobileNo: any;
  birthDate:any;
  postNumber: any;
  shomareShenasname: any;
  cityidLvlTwo: any;
  cityid: any;
  fixedTel: any;

  private today: NgbDateStruct;
  model: NgbDateStruct;
  date: {year: number, month: number};

  public formTaghaza : FormGroup;
  constructor(private fb: FormBuilder,calendar: NgbCalendar, config: NgbDatepickerConfig, public  userservice: UserService) {
   this.today = calendar.getToday();

   this.userservice.getcity().subscribe(
     post => {
       this.region = post;
       console.log(post);
     }
   );
  }


    setValue(value: string) {
      this.value = value;
      this.userservice.getcitylvl2(this.value).subscribe(
        post=>{
          this.city = post;
        }
      );
    }
    
  ngOnInit() {
    this.formTaghaza = this.fb.group({
      NationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      FirstName: [null, Validators.compose([Validators.required])],
      LastName: [null, Validators.compose([Validators.required])],
      FatherName: [null, Validators.compose([Validators.required])],
      RequesterType: ['0'],
      Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      shomareShenasname: [null, Validators.compose([Validators.required])],
      IssuedFrom: [null, Validators.compose([Validators.required])],
      Gender: ['', Validators.compose([Validators.required])],
      MobileNo: [null, Validators.compose([Validators.required])],
      BirthDate: [null, Validators.compose([Validators.required])],
      PostNumber: [null, Validators.compose([Validators.required])],
      Adress: [null, Validators.compose([Validators.required])],
      CityidLvlTwo: [null, Validators.compose([Validators.required])],
      Cityid: [null, Validators.compose([Validators.required])],
      FixedTel: [null, Validators.compose([Validators.required])],
    });
  }
  serachByNationalCode(event: KeyboardEvent) {
    const input = <HTMLInputElement>event.srcElement;
    this.serchFilter = input.value; // <-- have to add the latest character

    if(input.value.length == 10){
      alert('ads');
      this.userservice.serachByNationalCode(this.serchFilter).subscribe(
      post => {
         this.serch =JSON.parse( JSON.stringify(post));
         this.firstName = this.serch["firstNameReal"];
         this.lastName =  this.serch["lastNameReal"];
         this.fatherName =  this.serch["fatherNameReal"];
         this.requesterType = this.serch["requesterTypeReal"];
         this.email =  this.serch["emailReal"];
         this.shomareShenasname = this.serch["shomareShenasnameReal"];
         this.issuedFrom =  this.serch["issuedFromReal"];
         this.gender = this.serch["genderReal"];
         this.mobileNo =  this.serch["mobileNoReal"];
         this.birthDate = this.serch["birthDateReal"];
         this.postNumber =  this.serch["postNumberReal"];
         this.adress =  this.serch["adressReal"];
         this.cityidLvlTwo =  this.serch["cityidRealLvlTwo"];
         this.cityid =  this.serch["cityidReal"];
         this.fixedTel =  this.serch["fixedTel"];
         console.log(post);
         return true;
       }
     );
   }
  }

  sendFormTaghaza(){
    console.log(this.formTaghaza);
    console.log(this.formTaghaza.value);
  }
  SaveRequst(){
    const formObj = this.formTaghaza.getRawValue();
    this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  }

}
