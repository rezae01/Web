import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
// export * from '../../contianer-MK/component/notification/simple-notifications.component';
// import {SimpleNotificationsComponent} from './../../contianer-MK/component/notification/simple-notifications.component';
import { Task } from '../demand/model/task';
@Component({
  selector: 'app-demand',
  template: `
  <simple-notifications [options]="options"></simple-notifications>
  <router-outlet></router-outlet>
  `,
})

export class DemandComponent implements OnInit {

  constructor(private service: NotificationsService) {}
    // tslint:disable-next-line:member-ordering
    public options = {
      position: ['bottom', 'left'],
      timeOut: 5000,
      lastOnBottom: true,
      animate: 'fromRight',
      rtl: true,
      maxStack: 5,
    };
  ngOnInit() {

  }

}
