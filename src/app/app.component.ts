import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers: []
})
export class AppComponent implements OnInit {
  title = 'HEAD OFFICE BO | PT FAST FOOD INDONESIA';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });

    console.log(this.router.url)

    if(this.router.url == '') {
      console.log('hai')
    } else {
      console.log('halo')
    }
  }
}
