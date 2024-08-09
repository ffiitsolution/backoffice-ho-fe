import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MonitoringOutletComponent } from './monitoring-outlet/monitoring-outlet.component';
import { MonitoringOutletWsComponent } from './monitoring-outlet-ws/monitoring-outlet-ws.component';

export const routes: Routes = [
    {
        path: 'outlet',
        component: MonitoringOutletComponent,
        data: {
            title: 'Monitoring Outlet',
        },
    },
    {
        path: 'outlet-ws',
        component: MonitoringOutletWsComponent,
        data: {
            title: 'Monitoring Outlet via WebSocket',
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MonitoringRoutingModule {}
