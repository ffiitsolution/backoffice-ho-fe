import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { Router } from '@angular/router';
import { SidebarMenu } from '../../sidebar/sidebar.model'; 

@Component({
    selector: 'app-sidebar-item',
    templateUrl: 'sidebar-item.component.html',
    styleUrls: ['sidebar-item.component.scss']
})

export class SideBarItemComponent implements OnInit {
    @Input() item: SidebarMenu;
    @Input() depth: any;
    @Output() assemblyQueueChange = new EventEmitter<any>();

    parentBreadcrumb: string = ''; 
    childBreadcrumb: string = '';
  
    constructor(
        public navService: NavbarService, 
        public router: Router
    ) {
      if (this.depth === undefined) {
        this.depth = 0;
      }
    }

    ngOnInit() { }
  
    ngOnChanges() {
      this.navService.currentUrl.subscribe((url: string) => {
        if (this.item.route && url) {
        }
      });
    }
  
    // onItemSelected(item: any) {
    //   if (!item.children || !item.children.length) {
    //     this.router.navigate([item.route]);
    //   }
  
    //   // scroll
    //   document.querySelector('.page-wrapper')?.scroll({
    //     top: 0,
    //     left: 0,
    //   });
    // }

    goToPage(route: any) {
      this.router.navigate([route]);
    }

    toggleItem(item: SidebarMenu) {
      item.expanded = !item.expanded;

      if(!item.children) {
        this.parentBreadcrumb = item.parentName!
        this.goToPage(item.route);
      }
    }
  
    onItemSelected(item: SidebarMenu) {
      console.log(item)
      if (item.route) {
        this.router.navigate([item.route]);
      }
    }
}