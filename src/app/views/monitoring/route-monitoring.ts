import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MonitoringOutletComponent } from './monitoring-outlet/monitoring-outlet.component';

export const routes: Routes = [
    {
        path: 'outlet',
        component: MonitoringOutletComponent,
        data: {
            title: 'Monitoring Outlet',
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MonitoringRoutingModule {}
