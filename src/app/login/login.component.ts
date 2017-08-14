import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_service/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'test.html',
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  ERR: any;
  bod:any;
  titel:string;
  returnUrl: string;
constructor(private router: Router, private authenticationService: AuthenticationService) {
  this.titel="sadsadsadsad";
}
  //  constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authenticationService: AuthenticationService,
  //   private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
   this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   this.loading = true;
   this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
         this.router.navigate(['/home']);
       },
       error => {
        this.ERR = error;
        this.bod=this.ERR._body;
         //console.log(this.ERR._body);
         this.loading = false;
        });

    localStorage.setItem('currentUser',this.model.username);
   // this.router.navigate(['/login'] );
    //alert(this.model.username + this.model.password);
  }
}
