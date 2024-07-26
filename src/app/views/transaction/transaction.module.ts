import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes, TransactionRoutingModule } from './route-transaction';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        RouterModule.forChild(routes)
    ],
    providers: [

    ]
  })

  export class TransactionModule {}
