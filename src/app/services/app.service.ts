import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient
    ){}

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

    getListDataTable(url: string = '', body: any = {}): Observable<any> {
        return this.httpClient.post(this.BASE_URL + url, body, {
          headers: this.headers(),
        });
    }

    listGlobal(body: any = {}): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/global/dt', body, {
          headers: this.headers(),
        });
    }

}