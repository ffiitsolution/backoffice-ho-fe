import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './global/global.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {
    path: 'global',
    component: GlobalComponent,
    data: {
      title: 'Global'
    }
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MasterRoutingModule {}
