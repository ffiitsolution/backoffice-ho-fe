import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule, routes } from './route-report';
import { SendMasterComponent } from './send-master/send-master.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReportRoutingModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class ReportModule {}
