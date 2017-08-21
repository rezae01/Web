import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>`
})
export class AppComponent {


  constructor(translate: TranslateService, private _service: NotificationsService) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

}
