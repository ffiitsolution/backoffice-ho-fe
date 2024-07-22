import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                localStorage.setItem('last_page', event.urlAfterRedirects);
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }


}
