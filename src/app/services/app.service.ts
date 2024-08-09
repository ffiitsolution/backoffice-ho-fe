import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface VersionInfo {
    version: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;
    private functions: { [key: string]: () => void } = {};

    userData: any;

    isServerOnline: boolean = false;
    wsServerTime: any;
    wsListOutlet: any = [];

    data: any;
    params: any;
    args: any;
    type: any;

    versionFe: string = '';

    _isLoading$ = new BehaviorSubject<boolean>(false);

    isLoading = this._isLoading$.asObservable();

    constructor(
        private httpClient: HttpClient,
        private snackBar: MatSnackBar,
    ) {
        this.onInit();
    }

    private onInit() {
        this.getVersion();
    }

    setToken(token: string | null) {
        if (token) {
            localStorage.setItem('hq_token', token);
        } else {
            localStorage.removeItem('hq_token');
        }
    }

    getToken(): string | null {
        return localStorage.getItem('hq_token');
    }

    getUserData() {
        if (this.userData === null) {
            this.userData = JSON.parse(
                localStorage.getItem('hq_user') ?? '',
            );
        }
        return this.userData;
    }

    headers(): HttpHeaders {
        let headers = new HttpHeaders().set(
            'Content-Type',
            'application/json',
        );
        let token = this.getToken();

        if (token !== null && token?.length > 0) {
            headers = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('X-API-TOKEN', token);
        }
        return headers;
    }

    updateWsListOutlet(outletCode: string, columnName: string, value: string) {
        for (const outlet of this.wsListOutlet) {
            if (outlet.outletCode === outletCode) {
                outlet[columnName] = value;
                console.log(`Updated outletCode ${outletCode} with ${columnName}: ${value}`);
                return;
            }
        }
    }

    generateDateRange(startDate: string, endDate: string): string[] {
        // date format = '2024-07-01'
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateRange: string[] = [];
        for (
            let dt = new Date(start);
            dt <= end;
            dt.setDate(dt.getDate() + 1)
        ) {
            dateRange.push(dt.toISOString().split('T')[0]);
        }
        return dateRange;
    }

    registerFunction(key: string, func: () => void): void {
        this.functions[key] = func;
    }

    executeFunction(key: string): void {
        const func = this.functions[key];
        if (func) {
            func();
        } else {
            console.error(`No function registered with key: ${key}`);
        }
    }

    // type = error, success
    showSnackbar(message: string, type: string = 'success') {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: [type + '-snackbar'],
        });
    }

    getVersion() {
        this.httpClient
            .get<VersionInfo>('assets/version.json')
            .subscribe((data) => {
                this.versionFe = data.version;
            });
        return this.versionFe;
    }

    getListDataTable(url: string = '', body: any = {}): Observable<any> {
        return this.httpClient.post(this.BASE_URL + url, body, {
            headers: this.headers(),
        });
    }

    upsertDataTable(url: string, body: any = {}): Observable<any> {
        return this.httpClient.post(this.BASE_URL + url, body, {
            headers: this.headers(),
        });
    }

    dataLoading(loading: boolean) {
        this._isLoading$.next(loading);
    }

    doPostExternal(url: string, body: any = {}): Observable<any> {
        return this.httpClient.post(url, body, {
            headers: this.headers(),
        });
    }
}
