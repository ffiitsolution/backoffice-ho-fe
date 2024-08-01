import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AllReportComponent } from './all-report/all-report.component';
import { SendMasterComponent } from './send-master/send-master.component';

export const routes: Routes = [
    {
        path: 'all',
        component: AllReportComponent,
        data: {
            title: 'All Report',
        },
    },
    {
        path: 'send-master',
        component: SendMasterComponent,
        data: {
            title: 'Send Master',
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportRoutingModule {}
