import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { AppConfig } from '../../../config/app.config';
import { AuthService } from '../../../services/auth.service';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class LoginComponent implements OnInit {
    appTitle = AppConfig.settings.applicationTitle;
    appSubtitle = AppConfig.settings.applicationSubtitle;
    password: string;
    isLoading: boolean = false;
    version: string;
    year: number;

    errorMessage: string;
    hide = signal(true);


    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
      private authSvc: AuthService,
      public appSvc: AppService,
    ) { }

    ngOnInit() {
        this.year = new Date().getFullYear();
        this.authSvc.doLogout();
    }

    clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide);
        event.stopPropagation();
    }

    onSubmit(){
        if(this.loginForm.valid) {
            this.isLoading = true;
            let params = {
                staffCode : this.loginForm.value.username,
                password : this.loginForm.value.password,
                versionFe : this.appSvc.versionFe
            }
            this.authSvc.doLogin(params)
            .pipe(
                finalize(() => this.isLoading = false))
                .subscribe(response => {
                    const success = response?.success || false;
                    if (success) {
                        const user = response?.data?.user;
                        this.authSvc.setUser(user);
                        localStorage.setItem('hq_token', response?.data?.token);
                    }
                }
            );
        }
    }
}
