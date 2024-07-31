import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from '../services/app.service';
import { WebsocketService } from '../services/websocket.service';
import { AuthService } from '../services/auth.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class LayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('leftsidenav')

    // Value
    // dataBreadcrumb= {
    //     parentBreadcrumb: '',
    //     childBreadcrumb: '',
    // };

    dataBreadcrumb: any;

    bread = {
        parentBreadcrumb: '',
        childBreadcrumb: '',
    }

    isStorageBreadcrumb: boolean = false;

    isLoading: any;

    outletData: any;
    userData: any;
    willGoOffline: number = 0;

    public sidenav: MatSidenav | any;

    //get options from service
    private layoutChangesSubscription = Subscription.EMPTY;
    private isMobileScreen = false;
    private isContentWidthFixed = true;
    private isCollapsedWidthFixed = false;
    private htmlElement!: HTMLHtmlElement;

    get isOver(): boolean {
        return this.isMobileScreen;
    }

    constructor(
        private breakpointObserver: BreakpointObserver,
        private cdr: ChangeDetectorRef,
        private websocketService: WebsocketService,
        private service: AppService,
        private auth: AuthService
    ) {
        this.htmlElement = document.querySelector('html')!;
        this.layoutChangesSubscription = this.breakpointObserver
        .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
        .subscribe((state) => {
            // SidenavOpened must be reset true when layout changes

            this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

            this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        });
    }

    ngOnInit(): void {
        this.service.isLoading.subscribe((loading) => {
                this.isLoading = loading;
            }
        )
        this.userData = this.service.getUserData();
        this.websocketService.registerFunction('WS_SUBSCRIBE_HEADER', () => {
          this.doSubscribe();
        });
        this.checkServerTime();
        this.websocketService.initializeWebSocketConnection();
    }

    ngAfterViewInit(): void {
        const storedBreadcrumb = localStorage.getItem('dataBreadcrumb');
        console.log('storedBreadcrumb', storedBreadcrumb)

        if (storedBreadcrumb && storedBreadcrumb !== 'undefined') {
            this.isStorageBreadcrumb = true;
            this.dataBreadcrumb = JSON.parse(storedBreadcrumb);
            this.cdr.detectChanges()
        }

        this.cdr.detectChanges()
    }

    ngOnDestroy() {
        this.layoutChangesSubscription.unsubscribe();
        this.websocketService.unsubscribe('/topic/serverTime');
    }

    doSubscribe() {
      this.websocketService.subscribe('/topic/serverTime', (message: string) => {
        this.service.isServerOnline = true;
        this.willGoOffline = 2;
        const data = JSON.parse(message);
        this.service.wsServerTime = data;
        localStorage.setItem('hq_serverTime', data.serverTime ?? 'OFFLINE');
        localStorage.setItem('hq_beVersion', data.beVersion ?? 'OFFLINE');
      });
    }

    checkServerTime() {
      setInterval(() => {
        if (this.willGoOffline > 0) {
          this.willGoOffline--;
        } else {
          this.service.isServerOnline = false;
        }
      }, 1000);
    }

    toggleCollapsed() {
        this.isContentWidthFixed = false;
    }

    onSidenavClosedStart() {
        this.isContentWidthFixed = false;
    }

    onSidenavOpenedChange(isOpened: boolean) {
        this.isCollapsedWidthFixed = !this.isOver;
    }

    getDataBreadCrumb(dataBreadCrumb: any) {
        this.dataBreadcrumb = dataBreadCrumb;
    }
}
