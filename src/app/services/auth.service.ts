import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';

import { AppService } from './app.service';
import { AppConfig } from '../config/app.config';
import { Router } from '@angular/router';

interface AuthResponse {
    token: string;
    user: any;
    success: string;
    data: any;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    onDestroy$ = new Subject<void>();

    constructor(
        private httpClient: HttpClient,
        private appService: AppService,
        private router: Router,
    ) {}

    doLogin(params: any): Observable<AuthResponse | null> {
        return this.httpClient
            .post<AuthResponse>(this.BASE_URL + `/auth/login`, params)
            .pipe(
                tap((response) => {
                    const success = response?.success || false;
                    if (success) {
                        const user = response?.data?.user;
                        this.setToken(response?.data?.token);
                        this.setUser(user);
                        this.router.navigate(['/home']);
                        this.appService.showSnackbar(
                            'You are logged in.',
                            'success',
                        );
                    } else {
                        this.appService.showSnackbar(
                            response?.message,
                            'error',
                        );
                    }
                }),
                catchError((error) => {
                    let msg = error.message;
                    let status = error.status;
                    let message = '';
                    if (status === 0) {
                        message = 'Failed to connect to server.';
                    } else {
                        message = error.statusText ?? error.message;
                    }

                    this.appService.showSnackbar(message, 'error');
                    return of(null);
                }),
            );
    }

    doLogout() {
        localStorage.clear();
        this.appService.setToken(null);
    }

    setUser(user: any) {
        localStorage.setItem('hq_user', JSON.stringify(user));
    }

    private setToken(token: string) {
        localStorage.setItem('hq_token', token);
        this.appService.setToken(token);
    }

    isLoggedIn(): boolean {
        const xToken = localStorage.getItem('hq_token');
        const hqUser = localStorage.getItem('hq_user');
        return !!xToken && !!hqUser;
    }

    getLastPage(): string {
        return localStorage.getItem('last_page') || '/home';
    }
}
