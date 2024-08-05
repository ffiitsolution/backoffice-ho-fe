import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilService {
    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router) {}

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
}
