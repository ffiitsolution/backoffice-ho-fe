import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AppService } from "./app.service";
import { AppConfig } from "../config/app.config";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService    
    ){}

    doLogin(params: any): Observable<any> {
        return this.httpClient.post(this.BASE_URL +`/auth/login`, params);
    }

    doLogout() {
        localStorage.clear();
        this.appService.setToken(null);
    }

    setUser(user: any) {
        localStorage.setItem('hq_user', JSON.stringify(user));
    }
}