import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterRoutingModule, routes } from './route-master';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MasterRoutingModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class MasterModule {}
