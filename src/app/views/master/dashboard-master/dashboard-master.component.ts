import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-dashboard-master',
    templateUrl: 'dashboard-master.component.html',
    styleUrls: ['dashboard-master.component.scss'],
})
export class DashboardMasterComponent implements OnInit {
    headerTitle: string = '';
    onDestroy$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.headerTitle = 'Dashboard Master';
    }
}
