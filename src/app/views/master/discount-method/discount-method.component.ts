import { Component, OnInit } from '@angular/core';
import { tabDiscount } from '../../../helper/tab-menu.helper';

@Component({
    selector: 'app-discount-method',
    templateUrl: 'discount-method.component.html'
})

export class MasterDiscountMethodComponent implements OnInit {
    tabMenus: { tabMenuName: string; route: string }[] = tabDiscount;

    constructor() { }

    ngOnInit() { }
}