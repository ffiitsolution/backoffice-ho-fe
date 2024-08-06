import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    protected BASE_URL = AppConfig.settings.apiServer.BASE_URL;

    constructor(
        private httpClient: HttpClient,
        private appService: AppService,
    ) {}

    getFilterOutlet(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/outlet', {} ,{
                headers: this.appService.headers()
            }
        )
    }

    getFilterOrderType(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/order-type',
            {},
            {
                headers: this.appService.headers(),
            },
        );
    }

    getFilterListRegion(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/outlet-region',
            {},
            {
                headers: this.appService.headers(),
            },
        );
    }

    getFilterPaymentMethodCode(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/payment-method-code',
            {},
            {
                headers: this.appService.headers(),
            },
        );
    }

    getFilterPaymentTypeCode(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/payment-type-code',
            {},
            {
                headers: this.appService.headers(),
            },
        );
    }

    getFilterMenuGroupCode(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/menu-group-code',
            {},
            {
                headers: this.appService.headers(),
            }
        )
    }

    getFilterPriceTypeCode(): Observable<any> {
        return this.httpClient.post(
            this.BASE_URL + '/filter/price-type-code',
            {},
            {
                headers: this.appService.headers(),
            }
        )
    }
}
