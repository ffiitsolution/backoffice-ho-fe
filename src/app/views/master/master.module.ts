import { NgModule } from '@angular/core';
import { GlobalComponent } from './global/global.component';
import { RouterModule } from '@angular/router';
import { MasterRoutingModule, routes } from './route-master';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        GlobalComponent
    ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        
    ]
  })
  
  export class MasterModule {}