import { DatePipe } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { MESSAGES } from '../../../helper/message.helper';
import { AppService } from '../../../services/app.service';
import { UtilService } from '../../../services/util.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
    selector: 'app-monitoring-outlet-ws',
    templateUrl: 'monitoring-outlet-ws.component.html',
    styleUrls: ['monitoring-outlet-ws.component.scss'],
})
export class MonitoringOutletWsComponent implements OnInit {
    headerTitle: string = '';

    listMainVersion: any = [];

    constructor(
        private cdr: ChangeDetectorRef,
        public appSvc: AppService,
        private datePipe: DatePipe,
        private util: UtilService,
        private websocketService: WebsocketService,
    ) {}

    ngOnInit() {
        this.headerTitle = 'Monitoring Outlet via WebSocket';
    }

    ngAfterViewInit(): void {
        this.fetchOutletMonitoring();
    }

    fetchOutletMonitoring(): void {
        this.appSvc
            .upsertDataTable('/filter/main-version-app', {})
            .subscribe({
                next: (response: any) => {
                    if (response?.success) {
                        this.listMainVersion = response.data;
                    }
                },
                error: (error: any) => {
                    // console.error('Error fetching chart data', error);
                },
                complete: () => {
                    // console.log('Fetching chart data completed.');
                },
            });
        this.appSvc
            .upsertDataTable('/monitoring/outlet-monitoring', {})
            .subscribe({
                next: (response: any) => {
                    if (response?.success) {
                        this.appSvc.wsListOutlet = response.data;
                    } else {
                        this.appSvc.showSnackbar(
                            MESSAGES.ERROR_MESSAGE_EMPTY_DATA,
                        );
                    }
                },
                error: (error: any) => {
                    console.error('Error fetching chart data', error);
                },
                complete: () => {
                    // console.log('Fetching chart data completed.');
                },
            });
    }

    getVersionValue(app: string, code: string): string | undefined {
        const entry = this.listMainVersion.find(
            (item: any) => item.app === app && item.code === code,
        );
        return entry?.value;
    }
}
