import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-dashboard-transaction',
    templateUrl: 'dashboard-transaction.component.html',
    styleUrls: ['dashboard-transaction.component.scss'],
})
export class DashboardTransactionComponent implements OnInit {
    headerTitle: string = '';
    onDestroy$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.headerTitle = 'Dashboard Transaction';
    }
}
