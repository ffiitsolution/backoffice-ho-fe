import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardTransactionComponent } from './dashboard-transaction/dashboard-transaction.component';

export const routes: Routes = [
      {
            path: 'dashboard',
            component: DashboardTransactionComponent,
            data: {
                  title: 'Dashboard Transaction',
            },
      }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TransactionRoutingModule {}
