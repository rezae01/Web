import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserService } from '../../../_service/user.service';
declare var $: any;

@Component({
  selector: 'applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
  providers: [ UserService ],
})


export class ApplicantListComponent implements OnInit {
public dt: Date = new Date();
public startCheck = false;
  f: string[];
  re: any;
  city:any;
  serch: any;
  value: any;
  region: any;
  serchFilterLegal: any;
  serchFilterReal: any;
  name:string;
  submitted: boolean;
  // public formTaghazaReal: FormGroup;
  // public formTaghazaLegal: FormGroup;
// private fb: FormBuilder
  constructor(private http: Http, public  userservice: UserService) {
    // this.userservice.GETgridculomens().subscribe(
    //   post => {
    //     this.grid = post;
    //       console.log(post);
    //   }
    // );


  //   this.userservice.getcity().subscribe(
  //     post => {
  //       this.region = post;
  //       console.log(post);
  //     }
  //   );
  // }
  //
  // setValue(value: string) {
  //   this.value = value;
  //   this.userservice.getcitylvl2(this.value).subscribe(
  //     post=>{
  //       this.city = post;
  //     }
  //   );

  }

  // array of all items to be paged
  // private allItems: any[];
  //
  // // pager object
  // pager : any = {};
  //
  // // paged items
  // pagedItems: any[];
  //
  // firstNameReal:any;
  // lastNameReal: any;
  // fatherNameReal: any;
  // requesterTypeReal:any;
  // emailReal: any;
  // adressReal:any;
  // issuedFromReal: any;
  // genderReal:any;
  // mobileNoReal: any;
  // birthDateReal:any;
  // postNumberReal: any;
  // shomareShenasnameReal: any;
  // cityidRealLvlTwo: any;
  // cityidReal: any;
  // fixedTel: any;
  // nationalCodeLegal: any;
  // shenaseCodeLegal: any;
  // economicCodeLegal: any;
  // firstNameLegal: any;
  // companyTypeLegal: any;
  // requesterTypeLegal:any;
  // emailLegal: any;
  // mobileNoLegal: any;
  // postNumberLegal: any;
  // adressLegal :any;
  // phoneNumberLegal:any;
  // cityidLegalLvlTwo:any;
  // cityidLegal: any;
  ngOnInit() {
  // validation form
  // this.formTaghazaReal = this.fb.group({
  //   NationalCodeReal: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
  //   FirstNameReal: [null, Validators.compose([Validators.required])],
  //   LastNameReal: [null, Validators.compose([Validators.required])],
  //   FatherNameReal: [null, Validators.compose([Validators.required])],
  //   RequesterTypeReal: ['0'],
  //   EmailReal: [null, Validators.compose([Validators.required, CustomValidators.email])],
  //   shomareShenasnameReal: [null, Validators.compose([Validators.required])],
  //   IssuedFromReal: [null, Validators.compose([Validators.required])],
  //   GenderReal: ['', Validators.compose([Validators.required])],
  //   MobileNoReal: [null, Validators.compose([Validators.required])],
  //   BirthDateReal: ['', Validators.compose([Validators.required])],
  //   PostNumberReal: [null, Validators.compose([Validators.required])],
  //   AdressReal: [null, Validators.compose([Validators.required])],
  //   CityidRealLvlTwo: [null, Validators.compose([Validators.required])],
  //   CityidReal: [null, Validators.compose([Validators.required])],
  //   FixedTel: [null, Validators.compose([Validators.required])],
  // });
  // this.formTaghazaLegal = this.fb.group({
  //   // NationalCodeLegal: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
  //   ShenaseCodeLegal: [null, Validators.compose([Validators.required])],
  //   EconomicCodeLegal: [null, Validators.compose([Validators.required])],
  //   FirstNameLegal: [null, Validators.compose([Validators.required])],
  //   CompanyTypeLegal: ['', Validators.compose([Validators.required])],
  //   RequesterTypeLegal: ['0'],
  //   EmailLegal: [null, Validators.compose([Validators.required, CustomValidators.email])],
  //   MobileNoLegal: [null, Validators.compose([Validators.required])],
  //   PostNumberLegal: [null, Validators.compose([Validators.required])],
  //   AdressLegal: [null, Validators.compose([Validators.required])],
  //   PhoneNumberLegal: [null, Validators.compose([Validators.required])],
  //   Cityidlegal: [null, Validators.compose([Validators.required])],
  //   CityidLegalLvlTwo: [null, Validators.compose([Validators.required])]
  // });
  $(function(){
    $('#real').click(function(){
      $('input,select,textarea').removeAttr('disabled', false);
      $('.tab-content-legal input, .tab-content-legal select,.tab-content-legal textarea, button[type="submit"]').attr('disabled', true);
      $('.tab-content-legal').hide();
      $('.tab-content-real').show();
      $('.tab-content-legal input, .tab-content-legal select,.tab-content-legal textarea').val('');
    });
    $('#legal').click(function(){
      $('.tab-content-legal input, .tab-content-legal select,.tab-content-legal textarea').removeAttr('disabled', false);
      $('.tab-content-real input, .tab-content-real select,.tab-content-real textarea,.tab-content-real button[type="submit"]').attr('disabled', true);
      $('.tab-content-real').hide();
      $('.tab-content-legal').show();
      $('.tab-content-real input, .tab-content-real select,.tab-content-real textarea').val('');
    });
  });
  }
  // serachByNationalCode(event: KeyboardEvent) {
  //   const input = <HTMLInputElement>event.srcElement;
  //   this.serchFilterReal = input.value; // <-- have to add the latest character
  //
  //   if(input.value.length == 10){
  //     alert('ads');
  //     this.userservice.serachByNationalCode(this.serchFilterReal).subscribe(
  //     post => {
  //        this.serch =JSON.parse( JSON.stringify(post));
  //        this.firstNameReal= this.serch["firstNameReal"];
  //        this.lastNameReal =  this.serch["lastNameReal"];
  //        this.fatherNameReal =  this.serch["fatherNameReal"];
  //        this.requesterTypeReal = this.serch["requesterTypeReal"];
  //        this.emailReal =  this.serch["emailReal"];
  //        this.shomareShenasnameReal = this.serch["shomareShenasnameReal"];
  //        this.issuedFromReal =  this.serch["issuedFromReal"];
  //        this.genderReal = this.serch["genderReal"];
  //        this.mobileNoReal =  this.serch["mobileNoReal"];
  //        this.birthDateReal = this.serch["birthDateReal"];
  //        this.postNumberReal =  this.serch["postNumberReal"];
  //        this.adressReal =  this.serch["adressReal"];
  //        this.cityidRealLvlTwo =  this.serch["cityidRealLvlTwo"];
  //        this.cityidReal =  this.serch["cityidReal"];
  //        this.fixedTel =  this.serch["fixedTel"];
  //        console.log(post);
  //        return true;
  //      }
  //    );
  //  }
  // }
  // serachGetRegisteredByEconomic(event: KeyboardEvent ) {
  //   const input = <HTMLInputElement>event.srcElement;
  //   this.serchFilterLegal = input.value; // <-- have to add the latest character
  //   this.userservice.serachGetRegisteredByEconomic(this.serchFilterLegal).subscribe(
  //   post => {
  //     //  this.nationalCodeLegal = this.serch["nationalCodeLegal"];
  //      this.shenaseCodeLegal = this.serch["shenaseCodeLegal"];
  //      this.economicCodeLegal = this.serch["economicCodeLegal"];
  //      this.firstNameLegal = this.serch["firstNameLegal"];
  //      this.companyTypeLegal = this.serch["companyTypeLegal"];
  //      this.requesterTypeLegal= this.serch["requesterTypeLegal"];
  //      this.emailLegal = this.serch["emailLegal"];
  //      this.mobileNoLegal = this.serch["mobileNoLegal"];
  //      this.postNumberLegal = this.serch["postNumberLegal"];
  //      this.adressLegal = this.serch["adressLegal "];
  //      this.phoneNumberLegal= this.serch["phoneNumberLegal"];
  //      this.cityidLegalLvlTwo =  this.serch["cityidLegalLvlTwo"];
  //      this.cityidLegal =  this.serch["cityidLegal"];
  //      console.log(post);
  //    }
  //  );
  // }
  // public showDatePick(): void {
  //   if (this.startCheck == false){
  //     this.startCheck = true;
  //   } else {
  //     this.startCheck = false;
  //   }
  // }
  // setPage(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //     return;
  //   }
  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.allItems.length, page);
  //   // get current page of items
  //   this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
  //
  // sendFormTaghazaReal(){
  //   console.log(this.formTaghazaReal);
  //   console.log(this.formTaghazaReal.value);
  // }
  // SaveRequstReal(){
  //   const formObj = this.formTaghazaReal.getRawValue();
  //   this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  // }
  // sendFormTaghazaLegal(){
  //   console.log(this.formTaghazaLegal);
  //   console.log(this.formTaghazaLegal.value);
  // }
  // SaveRequstLegal(){
  //   const formObj = this.formTaghazaLegal.getRawValue();
  //   this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  // }

  // sendFormTaghazaReal(){
  //   console.log(this.formTaghaza);
  //   console.log(this.formTaghaza.value);
  // }
  // sendFormTaghazaLegal(){
  //   console.log(this.formTaghaza);
  //   console.log(this.formTaghaza.value);
  // }
  // SaveRequstReal(){
  //   const formObj = this.formTaghaza.getRawValue();
  //   this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  // }
  // SaveRequstLegal(){
  //   const formObj = this.formTaghaza.getRawValue();
  //   this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  // }
}
