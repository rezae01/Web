import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserService } from '../../../_service/user.service';

declare var $: any;

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.css']
})
export class FormWizardComponent implements OnInit {
  public formTaghaza : FormGroup;
  // public StepOneForm: FormGroup;
  // public StepTweForm: FormGroup;
  serch:any;
  firstName:any;
  constructor(private fb: FormBuilder,public userservice: UserService) {}
  ngOnInit() {

    // this.formTaghaza = this.fb.group({
    //   NationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    //   FirstName: [null, Validators.compose([Validators.required])],
    //   LastName: [null, Validators.compose([Validators.required])],
    //   FatherName: [null, Validators.compose([Validators.required])],
    //   RequesterType: ['0'],
    //   Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    //   shomareShenasname: [null, Validators.compose([Validators.required])],
    //   IssuedFrom: [null, Validators.compose([Validators.required])],
    //   Gender: ['', Validators.compose([Validators.required])],
    //   MobileNo: [null, Validators.compose([Validators.required])],
    //   BirthDate: ['', Validators.compose([Validators.required])],
    //   PostNumber: [null, Validators.compose([Validators.required])],
    //   Adress: [null, Validators.compose([Validators.required])],
    //   CityidLvlTwo: [null, Validators.compose([Validators.required])],
    //   Cityid: [null, Validators.compose([Validators.required])],
    //   FixedTel: [null, Validators.compose([Validators.required])],
    // });
    // this.StepOneForm = this.fb.group({
    //   RequesterId : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    //   email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    // });
    //
    // this.StepTweForm = this.fb.group({
    //   fname: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    //   email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    // });


  }

}
