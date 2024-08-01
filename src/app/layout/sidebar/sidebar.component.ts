import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navItems } from './sidebar-menu.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Output() dataBreadCrumb = new EventEmitter<any>();

    navItems = navItems;
    constructor() {}

    ngOnInit() {}

    getDataBreadCrumb(dataBreadcrumb: any) {
        this.dataBreadCrumb.emit(dataBreadcrumb);
    }
}
