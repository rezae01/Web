import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'forms',
  template: `
   <router-outlet></router-outlet>
  `,
})
export class FormsComponent implements OnInit {
  id: number;
  name: any;
  // private sub: any;

  constructor(private route: ActivatedRoute) {
    //  this.sub = this.route.params.subscribe(params => {
    //    this.id = +params['id'];
    //    this.name= +params['name'];
    // });
   }


  ngOnInit() {

  }
  // goToProductDetails(id) {
  //   this.router.navigate(['/product-details', id]);
  // }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}
