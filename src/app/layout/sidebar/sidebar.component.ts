import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-menu.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    navItems = navItems;
    constructor() { }

    ngOnInit() { }
}