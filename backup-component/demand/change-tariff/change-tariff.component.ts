import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';
@Component({
  selector: 'app-change-tariff',
  templateUrl: './change-tariff.component.html',
  styleUrls: ['./change-tariff.component.css']
})
export class ChangeTariffComponent implements OnInit {

  public changeTariff: FormGroup;

  submitted: boolean;
  re: any;

  constructor(private fb: FormBuilder,public  userservice: UserService) {
    this.submitted = false;
  }

  ngOnInit() {
    this.changeTariff = this.fb.group({
      SerachRes: [null, Validators.compose([Validators.required])],
      tariff: [null, Validators.compose([Validators.required])],
    });
  }
  changeTariffRes(){
    console.log(this.changeTariff);
    console.log(this.changeTariff.value);
  }
  SaveRequstTariff(){
    const formObj = this.changeTariff.getRawValue();
    this.userservice.SaveRequstTariff(formObj).subscribe(res => {this.re = res; console.log(res); });
  }
}
