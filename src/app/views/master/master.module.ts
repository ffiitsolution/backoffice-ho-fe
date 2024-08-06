import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterRoutingModule, routes } from './route-master';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MasterRoutingModule,
        RouterModule.forChild(routes),
        BaseChartDirective
    ],
    providers: [],
})
export class MasterModule {}
