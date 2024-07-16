import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './global/global.component';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet/outlet.component';


export const routes: Routes = [
  {
    path: 'global',
    component: GlobalComponent,
    data: {
      title: 'Global'
    }
  },
  {
    path: 'outlet',
    component: OutletComponent,
    data: {
      title: 'Outlet'
    }
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MasterRoutingModule {}
