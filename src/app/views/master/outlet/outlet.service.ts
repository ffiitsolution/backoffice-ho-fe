import { Injectable } from "@angular/core";
import { AppConfig } from "../../../config/app.config";
import { AppService } from "../../../services/app.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class OutletService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService
    ){}

    getFilterListType(): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/filter/outlet-type', {}, {
            headers: this.appService.headers()
        });
    }

    getFilterListRegion(): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/filter/outlet-region', {}, {
            headers: this.appService.headers()
        });
    }

    getFilterAreaCode(): Observable<any> {
        return this.httpClient.post(this.BASE_URL + '/filter/outlet-area', {}, {
            headers: this.appService.headers()
        });
    }
}