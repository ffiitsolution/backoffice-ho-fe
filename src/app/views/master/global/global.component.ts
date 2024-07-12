import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-global',
    templateUrl: 'global.component.html',
    styleUrls: ['global.component.scss']
})

export class GlobalComponent implements OnInit {
    headerTitle: string = '';
    onDestroy$ = new Subject<void>();

    constructor(
        private service: AppService
    ) { }

    ngOnInit() { 
        this.headerTitle = 'Master Data Global';
        this.getDataGlobal();
    }

    getDataGlobal() {
        this.service.listGlobal().pipe(
            takeUntil(this.onDestroy$),
            tap((data) => {
                console.log(data)
            })
        ).subscribe();
    }
}