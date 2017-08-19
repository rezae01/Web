import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
// import { Customer } from './interface';
// import {Observable} from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
// const URL = 'http://localhost:1920/api/Public/UploadFile';

declare var $: any;

import { UserService } from '../../../_service/user.service';
import './../../../../assets/javascript/jquery.tosrus.all.min.js';
import './../../../../assets/css/jquery.tosrus.all.css';

@Component({
  selector: 'app-send-documents',
  templateUrl: './send-documents.component.html',
  styleUrls: ['./send-documents.component.css'],
  providers: [ UserService ]
})
export class SendDocumentsComponent implements OnInit {

//   sendUploader: FileUploader = new FileUploader({
//     url: URL,
//     isHTML5: true
//   });
re: any;
 a: any[]= [{
    'IefileName': 'akbar',
    'title': 'Angular 2 - Getting Started',
    'summary': 'In this article, you will learn how to start working with Angular 2.'
}];

  // tslint:disable-next-line:no-input-rename
  @Input('group')
  // @ViewChild("fileInput") fileInput;
//   public myForm: FormGroup;

  public sendform: FormGroup;
  public userservice: UserService;
  md: any;
  private isUploadBtn: boolean = true;
  TypeFileUpload: any;



   resImg: any;
   resImg1: any;
   resImg2: any;
//   public myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public _userservice: UserService,
    private http: Http, private sanitizer: DomSanitizer
  ) { // public userservice: UserService
    this._userservice.getImageSend().subscribe(
      post => {
      this.resImg = post;
      this.resImg1 = this.resImg.result;
      // this.resImg2 = this.resImg1.completePath;
      // console.log(this.resImg);
      // console.log(this.resImg1);
      // console.log(this.resImg2);
      }
    );
  }

    // addFile(): void {
    //     alert('121212212')
    //     let fi = this.fileInput.nativeElement;
    //     if (fi.files && fi.files[0]) {
    //         alert(fi.files[0])
    //         let fileToUpload = fi.files[0];//fileToUpload
    //         alert(fileToUpload)
    //         this.userservice.upload(fileToUpload).subscribe(res => {
    //             console.log(res);
    //         });
    //     }
    // }

    // onChange(event) {
    //     alert(event);
    //     this.userservice.upload('http://localhost:1920/api/Public/UploadFile');
    //     let fileList: FileList = event.target.files;
    //         if (fileList.length > 0) {
    //     //         alert('')
    //     //         let file: File = fileList[0];
    //     //         let formData: FormData = new FormData();
    //     //         formData.append('uploadFile', file, file.name);
    //     //         let d = JSON.stringify(formData);
    //     //    // this.userservice.postFileUpLoad('http://localhost:1920/api/Public/UploadFile', formData);
    //     //    this.userservice.postFileUpLoad('http://localhost:1920/api/Public/UploadFile', d);
    // }}


    ngOnInit() {
        // this.myForm = this._fb.group({
        //     nameImage: ['', [Validators.required, Validators.minLength(5)]],
        //     // addresses: this._fb.array([])
        // });
        this.sendform = this.fb.group({
          TypeFileUpload: [null , Validators.compose([Validators.required])],
          // TypeFileUpload: [null],
          // nh:[null, [Validators.required]],
          file: [''],
        });




    // this.addAddress();

    $(function(){
      $('#example-2 a').tosrus({
          buttons: 'inline',
          pagination	: {
            add			: true,
            type		: 'thumbnails'
          }
        });
    })
  }
  // -------------------------------------------------------------
  // tslint:disable-next-line:member-ordering
  @ViewChild('fileInput') fileInput;
    // @ViewChild("TypeFileUpload") TypeFileUpload;
   addFile(): void {
    let fi = this.fileInput.nativeElement;
    // let TypeFileUpload = this.TypeFileUpload.nativeElement;
    if (fi.files && fi.files[0]) {
      // alert();
        let fileToUpload = fi.files[0];
        // this.TypeFileUpload= this.sendform.value;
        const formObj = this.sendform.getRawValue();
          let row = this.sendform.value;
          let valueRow = row.TypeFileUpload;
          // this.md = JSON.stringify(formObj);
        alert(valueRow);
        this.upload(fileToUpload, valueRow)
            .subscribe(res => {
                // console.log(res);
        });
    }
    // console.log(this.sendform.value);
   }
    upload(fileToUpload: any, md) {
      let input = new FormData();
      input.append('file', fileToUpload);
      // input.append('IefileName',this.TypeFileUpload);
      input.append('TypeFileUpload', md);
      input.append('BranchCode', md);
      input.append('RequestId', md);
      // کوشیار جا ن الان این دوتا داخل ویو مدل هم میان به جای این مقادیر سلکت بزار و مقاذیرشو بفرست

      return this.http.post('http://localhost:1920/api/Public/UploadFile', input);
    }

    DtValue(){
        // console.log(this.sendform);
        // console.log(this.sendform.value);
    }
    SaveNamefile(){
        // const formObj = this.sendform.getRawValue();
        // this.userservice.SendNameFile(formObj).subscribe(res => {this.re = res; console.log(res); 
        // });
    }
    // ngOnInit() {

    //     // add address
    //     this.addAddress();
    //     /* subscribe to addresses value changes */
    //     // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
    //     //   console.log(x);
    //     // })
    // }

    // initAddress() {
    //     return this._fb.group({
    //         street: ['', Validators.required],
    //         // postcode: ['']
    //     });
    // }

    // addAddress() {
    //     const control = <FormArray>this.myForm.controls['addresses'];
    //     const addrCtrl = this.initAddress();
    //     control.push(addrCtrl);
    //     /* subscribe to individual address value changes */
    //     // addrCtrl.valueChanges.subscribe(x => {
    //     //   console.log(x);
    //     // })
    // }

    // removeAddress(i: number) {
    //     const control = <FormArray>this.myForm.controls['addresses'];
    //     control.removeAt(i);
    // }

    // save(model: Customer) {
    //     // call API to save
    //     // ...
    //     console.log(model);
    // }


}
