import { Injectable } from '@angular/core';
import { AlertEmit } from './../contianer-MK/interfaces/alert/alert-emit';
import { Subject } from 'rxjs/Subject';
import { AlertSettings } from './../contianer-MK/interfaces/alert/alert-settings';
import { AlertType } from './../contianer-MK/interfaces/alert/alert-type';

@Injectable()
export class AlertsService {
    alert$: Subject<AlertEmit> = new Subject();

    create(type: AlertType, message: string, settingsOverrides: AlertSettings = {}) {
        this.alert$.next({type: type, message: message, override: settingsOverrides});
    }
}