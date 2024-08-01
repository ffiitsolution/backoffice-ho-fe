import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Router } from '@angular/router';
import { SidebarMenu, SidebarSideMenu } from '../../sidebar/sidebar.model';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: 'sidebar-item.component.html',
    styleUrls: ['sidebar-item.component.scss'],
})
export class SideBarItemComponent implements OnInit {
    @Input() item: SidebarMenu;
    @Input() depth: any;
    @Output() dataBreadCrumb = new EventEmitter<any>();

    parentBreadcrumb: string = '';
    childBreadcrumb: string = '';

    constructor(
        public navService: NavigationService,
        public router: Router,
    ) {
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    ngOnInit() {}

    goToPage(route: any) {
        if (route) this.router.navigate([route]);
    }

    toggleItem(item: SidebarMenu) {
        item.expanded = !item.expanded;
        this.parentBreadcrumb = item.parentName!;
        let dataBreadCrumb: any;

        if (!item.children) {
            dataBreadCrumb = {
                parentBreadcrumb: this.parentBreadcrumb,
            };
            this.dataBreadCrumb.emit(dataBreadCrumb);
            this.goToPage(item.route);
        }
        this.dataBreadCrumb.emit(dataBreadCrumb);
        localStorage.setItem(
            'dataBreadcrumb',
            JSON.stringify(dataBreadCrumb),
        );
        this.goToPage(item.route);
    }

    onItemSelected(item: SidebarMenu) {
        this.childBreadcrumb = item.displayName;

        if (item.route) {
            const dataBreadCrumb = {
                parentBreadcrumb: this.parentBreadcrumb,
                childBreadcrumb: this.childBreadcrumb,
            };

            this.dataBreadCrumb.emit(dataBreadCrumb);
            localStorage.setItem(
                'dataBreadcrumb',
                JSON.stringify(dataBreadCrumb),
            );
            this.router.navigate([item.route]);
        }
    }
}
