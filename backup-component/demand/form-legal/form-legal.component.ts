import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'form-legal',
  templateUrl: './form-legal.component.html',
  styleUrls: ['./form-legal.component.css'],
  providers: [
    UserService
]
})
export class FormLegalComponent implements OnInit {
  re: any;
  region: any;
  serch: any;
  value: any;
  city:any;
  serchFilter: any;
  shenaseCode: any;
  economicCode: any;
  firstName: any;
  companyType: any;
  requesterType:any;
  email: any;
  mobileNo: any;
  postNumber: any;
  adress: any;
  phoneNumber: any;
  cityidLvlTwo: any;
  cityid: any;
  fixedTel: any;

  public formTaghaza : FormGroup;
  constructor(private fb: FormBuilder, public  userservice: UserService) {
    // this.userservice.getcity().subscribe(
    //   post => {
    //     this.region = post;
    //     console.log(post);
    //   }
    // );
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
      ShenaseCode: [null, Validators.compose([Validators.required])],
      EconomicCode: [null, Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
      FirstName: [null, Validators.compose([Validators.required])],
      CompanyType: ['', Validators.compose([Validators.required])],
      RequesterType: ['0'],
      Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      MobileNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      PostNumber: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      Address: [null, Validators.compose([Validators.required])],
      Cityid: [null, Validators.compose([Validators.required])],
      // CityidLvlTwo: [null, Validators.compose([Validators.required])],
      FixedTel: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
    });
  }
  serachGetRegisteredByEconomic(event: KeyboardEvent ) {
    const input = <HTMLInputElement>event.srcElement;
    this.serchFilter = input.value; // <-- have to add the latest character
    this.userservice.serachGetRegisteredByEconomic(this.serchFilter).subscribe(
    post => {
       this.shenaseCode = this.serch["shenaseCodeLegal"];
       this.economicCode = this.serch["economicCodeLegal"];
       this.firstName = this.serch["firstNameLegal"];
       this.companyType = this.serch["companyTypeLegal"];
       this.requesterType = this.serch["requesterTypeLegal"];
       this.email = this.serch["emailLegal"];
       this.mobileNo = this.serch["mobileNoLegal"];
       this.postNumber = this.serch["postNumberLegal"];
       this.adress = this.serch["adressLegal "];
       this.fixedTel = this.serch["phoneNumberLegal"];
       this.cityidLvlTwo =  this.serch["cityidLegalLvlTwo"];
       this.cityid =  this.serch["cityidLegal"];
       console.log(post);
     }
   );
  }
  sendFormTaghaza(){
    console.log(this.formTaghaza);
    console.log(this.formTaghaza.value);
  }
  SaveRequstLegal(){
    const formObj = this.formTaghaza.getRawValue();
    this.userservice.Saverequst(formObj).subscribe(res => {this.re = res; console.log(res); });
  }

}
