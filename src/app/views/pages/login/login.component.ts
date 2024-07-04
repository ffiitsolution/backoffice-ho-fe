import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    appTitle = AppConfig.settings.applicationTitle;
    appSubtitle = AppConfig.settings.applicationSubtitle;
    errorMessage: string;
    username: string;
    password: string;
    isLoading: boolean = false;
    version: string;
    year: number;

    constructor(
        private router: Router,
        private authSvc: AuthService,    
    ) { }

    ngOnInit() { 
        this.year = new Date().getFullYear();
        this.authSvc.doLogout();
    }

    doLogin(){

    }
}