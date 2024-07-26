import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-all-report',
    templateUrl: 'all-report.component.html',
    styleUrls: ['all-report.component.scss']
})

export class AllReportComponent implements OnInit {
    headerTitle: string = '';
    onDestroy$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
      this.headerTitle = 'All Report';
    }

}
