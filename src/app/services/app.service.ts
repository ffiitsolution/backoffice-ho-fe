import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config";
import { HttpClient } from "@angular/common/http";

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

}