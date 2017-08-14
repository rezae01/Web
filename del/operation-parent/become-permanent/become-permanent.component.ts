import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-become-permanent',
  templateUrl: './become-permanent.component.html',
  styleUrls: ['./become-permanent.component.css']
})
export class BecomePermanentComponent implements OnInit {
  public become: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.become = this.fb.group({
      SerachRes: [null, Validators.compose([Validators.required])],
    });
  }

}
