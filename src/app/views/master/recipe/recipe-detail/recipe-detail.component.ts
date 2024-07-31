import { Component, OnInit } from '@angular/core';
import { tabRecipe } from '../../../../helper/tab-menu.helper';

@Component({
    selector: 'recipe-detail',
    templateUrl: 'recipe-detail.component.html',
    styleUrls: ['../recipe-header.component.scss']
})

export class RecipeDetailComponent implements OnInit {
    tabMenus: { tabMenuName: string; route: string; }[] = tabRecipe;
    headerTitle: string = 'Master Recipe Detail';
    apiUrl: string = '/recipe-detail/dt';
    menuTable: string = 'master-detail';
    renderColumns: any;
    condList: any;
    setOrderBy: any;


    constructor() { }

    ngOnInit() {
        this.onRenderColumn();
        this.onOrderBy();
    }
    
    onRenderColumn() {
        this.renderColumns = [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'recipeCode', title: 'Recipe Code', orderable: true, searchable: true },
            { data: 'itemCode', title: 'Item Code', orderable: true, searchable: true },
            { data: 'qtyPurchase', title: 'Qty Purchase', orderable: true, searchable: true },
            { data: 'uomPurchase', title: 'UOM Purchase', orderable: true, searchable: true },
            { data: 'qtyStock', title: 'Qty Stock', orderable: true, searchable: true },
            { data: 'uomStock', title: 'UOM Stock', orderable: true, searchable: true },
            { data: 'remark', title: 'Remark', orderable: true, searchable: true },
            {
                data: 'status',
                title: 'ACTIONS',
                orderable: false,
                searchable: false,
                render: (data: any, type: any, row: any) => {
                  ` <div class="dropdown-action">
                      <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                      <div class="dropdown-content">
                        <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                        <button class="action-button"><i class="fa fa-power-off"></i> Inactive</button>
                      </div>
                    </div>
                  `
                  let actionBtn =  `
                    <div class="dropdown-action">
                      <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                      <div class="dropdown-content">
                        <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                  `;
                  return actionBtn;
                },
            }
        ]
    }

    onOrderBy() {
        this.setOrderBy =  [[1, 'asc']];
    }
}