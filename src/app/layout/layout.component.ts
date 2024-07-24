import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from '../services/app.service';

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
    dataBreadcrumb= {
        parentBreadcrumb: '',
        childBreadcrumb: '',
    };

    bread = {
        parentBreadcrumb: '',
        childBreadcrumb: '',
    }

    isStorageBreadcrumb: boolean = false;

    isLoading: any;

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
        private service: AppService
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
    }


    ngAfterViewInit(): void {
        const storedBreadcrumb = localStorage.getItem('dataBreadcrumb');

        if (storedBreadcrumb) {
            this.isStorageBreadcrumb = true;
            this.dataBreadcrumb = JSON.parse(storedBreadcrumb);
            this.cdr.detectChanges()
        }

        this.cdr.detectChanges()
    }


    ngOnDestroy() {
        this.layoutChangesSubscription.unsubscribe();
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