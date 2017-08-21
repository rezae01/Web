import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd ,ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../_service/user.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

import * as Ps from 'perfect-scrollbar';
@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  providers: [MenuItems, UserService]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  id: number;
  id2: any;
  private sub: any;

  private _router: Subscription;

  today: number = Date.now();
  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  currentLang = 'en';
  po: any;
  po2: any;
  po3:any;

  public columns: Array<any> = [];
  private data: Array<any> = [];
  UserId:any;
  UserIdResult:any;
  @ViewChild('sidemenu') sidemenu;
  @ViewChild('root') root;

  ngAfterViewInit() {
    this.root.dir = 'rtl';
  }
  constructor(
    private router: Router,
    public menuItems: MenuItems,
    public translate: TranslateService,
    public _userservice: UserService,
    private route: ActivatedRoute
  ) {

    // window.addEventListener('load', function (e) {
    //   if (window.sessionStorage !== null && (window.location.href.indexOf('/login') === -1 &&  window.location.href.indexOf('confirm-user') === -1)) {
    //     window.sessionStorage.clear();
    //     window.location.href = '/login';
    //   }
    // });


    this._userservice.UserId().subscribe(
      post => {
        this.UserId = post;
        this.UserIdResult = this.UserId.result;
        localStorage.setItem('userId', this.UserIdResult.userId);
        // console.log(localStorage.getItem('userId'));
      }
    );


    const browserLang: string = translate.getBrowserLang();
    this.dark = false;

    this.menuItems.getAll().subscribe(
      post => {
        this.po = post;
        // this.po2 = this.po.children;
        // this.po3 = this.po2.formliatcode
        // console.log(this.po);
        // console.log(this.po2);
      }
    );
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

// data = JSON.parse( localStorage.getItem('getParameter'))
  }
// te(data:any){
//   localStorage.setItem('getitem', data);
//    this.myEvent.emit(null);
// }
  // sendParamter() {
  //   let getParameter: number;
  //   getParameter = JSON.parse( localStorage.getItem('getParameter'));
  //   localStorage.setItem('getParameter', JSON.stringify( getParameter ));
  // }
  public logout(route: ActivatedRouteSnapshot) {
    localStorage.removeItem('');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
      Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
      Ps.initialize(elemContent, { wheelSpeed: 2, suppressScrollX: true });
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.url = event.url;
      if (this.isOver()) {
        this.sidemenu.close();
      }

      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
        Ps.update(elemContent);
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    setTimeout(() => {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
        Ps.update(elemSidebar);
      }
    }, 350);
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'timelmenuine', name: 'MENU'}
      ]
    });
  }
}
