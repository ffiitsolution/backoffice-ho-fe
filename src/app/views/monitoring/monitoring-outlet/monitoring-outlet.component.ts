import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MESSAGES } from '../../../helper/message.helper';
import { AppService } from '../../../services/app.service';
import { UtilService } from '../../../services/util.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
    selector: 'app-monitoring-outlet',
    templateUrl: 'monitoring-outlet.component.html',
    styleUrls: ['monitoring-outlet.component.scss'],
})
export class MonitoringOutletComponent implements OnInit {
    headerTitle: string = '';

    listOutletRegion: any = [];
    listMainVersion: any = [];
    listOutlet: any = [];

    selectedOutletRegion: any;

    constructor(
        private cdr: ChangeDetectorRef,
        private appSvc: AppService,
        private datePipe: DatePipe,
        private util: UtilService,
        private websocketService: WebsocketService,
    ) {}

    ngOnInit() {
        this.headerTitle = 'Monitoring Outlet';
    }

    ngAfterViewInit(): void {
        this.fetchOutletMonitoring();
    }

    onSelectedOutletRegionChange() {
        console.log(this.selectedOutletRegion);
    }

    fetchOutletMonitoring(): void {
        this.appSvc.upsertDataTable('/filter/outlet-region', {}).subscribe({
            next: (response: any) => {
                if (response?.success) {
                    this.listOutletRegion = response.data;
                    // console.error('/outlet-region: ', response.data);
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
                        this.listOutlet = response.data;
                        this.fetchIpResponse();
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

    fetchIpResponse() {
        //-- BOFFI
        this.listOutlet.forEach((outlet: any) => {
            // outlet.boffiBe = 'LOADING';
            // outlet.boffiFe = 'LOADING';
            // outlet.boffiTime = 'LOADING';
            // outlet.mpcsBe = 'LOADING';
            // outlet.mpcsFe = 'LOADING';
            this.appSvc
                .upsertDataTable('/post-external', {
                    url: 'http://' + outlet.ipOutlet + ':9292/boffi/halo',
                })
                .subscribe({
                    next: (response: any) => {
                        // outlet.boffiBe = response?.backendVersion;
                        // outlet.boffiFe = response?.frontendVersion;
                        // outlet.boffiTime = response?.outletTime;
                        this.updateListOutlet(response?.outlet, response);
                    },
                    error: (error: any) => {
                        outlet.boffiBe = 'ERROR';
                        outlet.boffiFe = 'ERROR';
                        outlet.boffiTime = 'ERROR';
                    },
                    complete: () => {
                        // console.log('Fetching chart data completed.');
                    },
                });
            this.appSvc
                .upsertDataTable('/post-external', {
                    url: 'http://' + outlet.ipOutlet + ':9292/mpcs/halo',
                })
                .subscribe({
                    next: (response: any) => {
                        // outlet.mpcsBe = response?.version_be;
                        // outlet.mpcsFe = response?.version_fe;
                        this.updateListOutletMpcs(
                            response?.outlet_code,
                            response,
                        );
                    },
                    error: (error: any) => {
                        outlet.mpcsBe = 'ERROR';
                        outlet.mpcsFe = 'ERROR';
                    },
                    complete: () => {
                        // console.log('Fetching chart data completed.');
                    },
                });
        });
    }

    updateListOutlet(outletCode: string, response: any) {
        for (const outlet of this.listOutlet) {
            if (outlet.outletCode === outletCode) {
                outlet.boffiBe = response?.backendVersion;
                outlet.boffiFe = response?.frontendVersion;
                outlet.boffiTime = response?.boffiTime;
                return;
            }
        }
    }

    updateListOutletMpcs(outletCode: string, response: any) {
        for (const outlet of this.listOutlet) {
            if (outlet.outletCode === outletCode) {
                outlet.mpcsBe = response?.version_be;
                outlet.mpcsFe = response?.version_fe;
                return;
            }
        }
    }

    doUpdate(outlet: any) {
        this.appSvc
            .upsertDataTable('/post-external', {
                url:
                    'http://' +
                    outlet.ipOutlet +
                    ':9292/ftpfileupdater/do-sync',
            })
            .subscribe({
                next: (response: any) => {
                    alert(response.body());
                    if (response.status >= 200 && response.status < 300) {
                    }
                },
                error: (error: any) => {
                    alert(error);
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
