import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MenuItems } from '../shared/menu-items/menu-items';
import {UserViewModel} from './Menu2';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { post } from './post';
import { json } from 'ng2-validation/dist/json';
// tslint:disable-next-line:eofline
import { any } from 'codelyzer/util/function';


@Injectable()
export class SearchService {
    public  Url_app: string;
    constructor(private http: Http) {
        this.Url_app = 'http://localhost:1920';
    }

// tslint:disable-next-line:eofline
}