import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-integration-separation',
  templateUrl: './integration-separation.component.html',
  styleUrls: ['./integration-separation.component.css']
})
export class IntegrationSeparationComponent implements OnInit {
  IntegraSeparation: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.IntegraSeparation = this.fb.group({
      SerachRes: ['', Validators.compose([Validators.required])],
    });
  }

  // PowerShiftRes(){
  //   console.log(this.PowerShift);
  //   console.log(this.PowerShift.value);
  // }
  // SaveRequstPowerShiftRes(){
  //   const formObj = this.PowerShift.getRawValue();
  //   this.userservice.SaveRequstPowerShiftRes(formObj).subscribe(res => {this.re = res; console.log(res); });
  // }
  }
