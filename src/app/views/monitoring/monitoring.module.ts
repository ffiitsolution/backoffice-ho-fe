import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes, MonitoringRoutingModule } from './route-monitoring';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MonitoringRoutingModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class MonitoringModule {}
