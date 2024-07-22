import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface VersionInfo {
  version: string;
}

@Injectable({
    providedIn: 'root',
})

export class AppService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    versionFe: string = '';

    _isLoading$ = new BehaviorSubject<boolean>(false);

    isLoading = this._isLoading$.asObservable();

    constructor(private httpClient: HttpClient) {
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

    headers(): HttpHeaders {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let token = this.getToken();

        if (token !== null && token?.length > 0) {
            headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('X-API-TOKEN', token);
        }
        return headers;
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
            headers: this.headers()
        });
    }

    dataLoading(loading: boolean) {
        this._isLoading$.next(loading);
    }
}
