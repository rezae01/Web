import { Component, OnInit , Input, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserService } from '../../../_service/user.service';
declare var $: any;

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
  providers: [ UserService ],
})


export class ApplicantListComponent implements OnInit {

  public dt: Date = new Date();
  public startCheck = false;
  f: string[];
  re: any;
  city: any;
  serch: any;
  a = [];
  value: any;
  region: any;
  serchFilterLegal: any;
  serchFilterReal: any;
  name: string;
  submitted: boolean;
  public result: any;
  input: any;
  receiveddata: any;

  id: any;
  public columns: Array<any> = [];
  private data: Array<any> = [];


  
  disabledLink: boolean = false;

  constructor(
    private http: Http,
    public userservice: UserService
  ) {
    function SaveDataToLocalStorage(data) {
        this.receiveddata = JSON.stringify(data);
        this.a.push(this.receiveddata);
        alert(this.a);
        localStorage.setItem('session', this.a);
    }

    this.userservice.GETgridculomens(this.id).subscribe(
      post => {
      this.columns = post;
        console.log(post);
      }

    );
    this.userservice.GETgridculomensGrid(this.id).subscribe(
      post => {
        this.data = post;
        console.log(post);
      }
    );
  }
  changeBool(val: boolean) {
    this.disabledLink = val;
  }
  dataA(data: any) {
    data = (localStorage.getItem('requesterId'));
    this.userservice.paramter(data).subscribe(
      post => {
        this.city = post;
        console.log(post);
      }
    );
  }
   clicktab(): void {
        this.test()
            .subscribe(res => {
                console.log(res);
        });
   }
  test() {
    this.input = new FormData();

    this.input.append('branchCode', localStorage.getItem('branchCode'));
    this.input.append('requestId', localStorage.getItem('requestId'));
    // کوشیار جا ن الان این دوتا داخل ویو مدل هم میان به جای این مقادیر سلکت بزار و مقاذیرشو بفرست
    return this.http.post('http://localhost:1920/api/Public/UploadFile', this.input);
  }
  ngOnInit() {

    $(function(){
      $('#real,#legal').hide();
      $('#real-nav').click(function(){
        $('#real').show();
        $('#legal').hide();
        $('.tab-content-real').show();
        $('.tab-content-legal input, .tab-content-legal select,.tab-content-legal textarea').val('');
      });
      $('#legal-nav').click(function(){
        $('#legal').show();
        $('#real').hide();
        $('.tab-content-real').hide();
        $('.tab-content-legal').show();
        $('.tab-content-real input, .tab-content-real select,.tab-content-real textarea').val('');
      });
    });
  }
}
