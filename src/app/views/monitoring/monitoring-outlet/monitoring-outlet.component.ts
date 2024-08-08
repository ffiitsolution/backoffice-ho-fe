import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MESSAGES } from '../../../helper/message.helper';
import { AppService } from '../../../services/app.service';
import { UtilService } from '../../../services/util.service';
import ADTSettings from 'datatables.net';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-monitoring-outlet',
    templateUrl: 'monitoring-outlet.component.html',
    styleUrls: ['monitoring-outlet.component.scss'],
})
export class MonitoringOutletComponent implements OnInit {
    headerTitle: string = '';
    onDestroy$ = new Subject<void>();

    listOutlet: any = [];

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    constructor(
        private cdr: ChangeDetectorRef,
        private appSvc: AppService,
        private datePipe: DatePipe,
        private util: UtilService,
    ) {}

    ngOnInit() {
        this.headerTitle = 'Monitoring Outlet';
        this.dtOptions = {
            processing: true,
            serverSide: false,
            autoWidth: true,
            info: true,
            columns: [
                { title: 'Region Code', data: 'regionCode' },
                { title: 'Area Code', data: 'areaCode' },
                { title: 'Outlet Code', data: 'outletCode' },
                { title: 'Type', data: 'type' },
                //   { title: 'Initial Outlet', data: 'initialOutlet' },
                { title: 'Outlet Name', data: 'outletName' },
                { title: 'City', data: 'city' },
                //   { title: 'Transaction Date', data: 'transDate' },
                { title: 'RSC Code', data: 'rscCode' },
                //   { title: 'IP Outlet', data: 'ipOutlet' }
            ],
        };
    }

    ngAfterViewInit(): void {
        if (this.dtElement) {
            this.dtElement.dtInstance
                .then((dtInstance) => {
                    console.log('DataTable instance:', dtInstance);
                })
                .catch((error) => {
                    console.error(
                        'Error accessing DataTable instance:',
                        error,
                    );
                });
        }
        this.fetchChartData();
    }

    fetchChartData(): void {
        this.appSvc
            .upsertDataTable('/monitoring/outlet-monitoring', {})
            .subscribe({
                next: (response: any) => {
                    if (response?.success) {
                        this.listOutlet = response.data;
                        console.log(response.data);
                        this.reloadDt();
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

    reloadDt(): void {
        if (this.dtElement) {
            this.dtElement.dtInstance
                .then((dtInstance: DataTables.Api) => {
                    dtInstance.clear();
                    dtInstance.rows.add(this.listOutlet);
                    dtInstance.draw();
                })
                .catch((error) => {
                    console.error(
                        'Error accessing DataTable instance:',
                        error,
                    );
                });
        }
    }
}
