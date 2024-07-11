import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class NavbarComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    logout() {
        this.authService.doLogout();
        this.router.navigate(['/login']);
    }
}