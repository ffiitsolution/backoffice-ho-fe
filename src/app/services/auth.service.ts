import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService    
    ){}

    doLogin(username: any, password: any): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/auth/login', {
            staffCode: username,
            password: password
        });
    }

    doLogout() {
        localStorage.clear();
        this.appService.setToken(null);
    }

}