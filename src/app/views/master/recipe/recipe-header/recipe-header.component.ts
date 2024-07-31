import { Component, OnInit } from '@angular/core';
import { tabRecipe } from '../../../../helper/tab-menu.helper';

@Component({
    selector: 'recipe-header',
    templateUrl: 'recipe-header.component.html',
    styleUrls: ['../recipe-header.component.scss']
})

export class RecipeHeaderComponent implements OnInit {
    headerTitle: string = 'Master Recipe Header';
    apiUrl: string = '/recipe-header/dt';
    renderColumns: any;
    menuTable: string = 'master-recipe';
    condList: any;
    setOrderBy: any;
    tabMenus: { tabMenuName: string; route: string; }[] = tabRecipe;

    constructor() { }

    ngOnInit() { 
        this.headerTitle = 'Master Data Recipe';
        this.menuTable = 'master-recipe';
        this.apiUrl = '/recipe-header/dt';

        this.onRenderColumn();
        this.onOrderBy();
    }

    onRenderColumn(){
        this.renderColumns = [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'recipeCode', title: 'RECIPE CODE', orderable: true, searchable: true },
            { data: 'recipeRemark', title: 'RECIPE REMARK', orderable: true, searchable: true },
            { data: 'mpcsGroup', title: 'MPCS GROUP', orderable: true, searchable: true },
            {
                data: 'status',
                title: 'STATUS',
                orderable: true,
                searchable: true,
                render: (data: any, type: any, row: any) => {
                  const statusText = data === 'A' ? 'Active' :  (data === 'I' ? 'Inactive' : '-');
                  return `
                    <div class="badge-status badge-status__${data}">
                        ${statusText}
                    </div>
                  `;
                },
            },
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
                  if (data == 'I') {
                    actionBtn += `
                        <button class="action-button action-activate"><i class="fa fa-power-off"></i> Activate</button>
                      </div>
                    </div>`
                  } else {
                    actionBtn += `
                        <button class="action-button action-inactive"><i class="fa fa-power-off"></i> Inactive</button>
                      </div>
                    </div>`
                  }
                  return actionBtn;
                },
            }
        ]
    }

    onOrderBy() {
        this.setOrderBy =  [[1, 'asc']];
    }
}