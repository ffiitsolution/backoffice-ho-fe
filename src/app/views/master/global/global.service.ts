import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { AppService } from '../../../services/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService,
    ) {}

    getListGlobalCondition(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/global-cond',
            {},
            {
                headers: this.appService.headers(),
            },
        );
    }
}
