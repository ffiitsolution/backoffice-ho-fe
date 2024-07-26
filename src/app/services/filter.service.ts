import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app.config"; 
import { AppService } from "./app.service"; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService
    ){}

    getFilterOrderType(): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/filter/order-type', {}, {
            headers: this.appService.headers()
        });
    }

    getFilterListRegion(): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/filter/outlet-region', {}, {
            headers: this.appService.headers()
        });
    }
}

