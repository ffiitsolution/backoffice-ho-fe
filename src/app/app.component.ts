import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers: []
})
export class AppComponent implements OnInit {
  title = 'HEAD OFFICE BO | PT FAST FOOD INDONESIA';

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
