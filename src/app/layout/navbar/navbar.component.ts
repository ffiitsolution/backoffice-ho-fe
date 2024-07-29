import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class NavbarComponent implements OnInit {
    constructor(
        private authService: AuthService,
        public service: AppService,
        private router: Router
    ) { }

    dataUser: any;

    ngOnInit() {
      this.dataUser = JSON.parse(localStorage.getItem('hq_user') ?? '');
     }

    logout() {
        this.authService.doLogout();
        this.router.navigate(['/login']);
    }
}
