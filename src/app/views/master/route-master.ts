import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './global/global.component';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet/outlet.component';
import { ItemSupplierComponent } from './item-supplier/item-supplier.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemLimitComponent } from './menu-item-limit/menu-item-limit.component';
import { MenuItemScheduleComponent } from './menu-item-schedule/menu-item-schedule.component';
import { MenuSetComponent } from './menu-set/menu-set.component';
import { ModifierItemComponent } from './modifier-item/modifier-item.component';
import { MpcsDetailComponent } from './mpcs-detail/mpcs-detail.component';
import { MpcsHeaderComponent } from './mpcs-header/mpcs-header.component';
import { SupplierComponent } from './supplier/supplier.component';

export const routes: Routes = [
  {
    path: 'global',
    component: GlobalComponent,
    data: {
      title: 'Global',
    },
  },
  {
    path: 'outlet',
    component: OutletComponent,
    data: {
      title: 'Outlet',
    },
  },
  {
    path: 'menu-item',
    component: MenuItemComponent,
    data: {
      title: 'Menu Item',
    },
  },
  {
    path: 'menu-item-limit',
    component: MenuItemLimitComponent,
    data: {
      title: 'Menu Item Limit',
    },
  },
  {
    path: 'menu-item-schedule',
    component: MenuItemScheduleComponent,
    data: {
      title: 'Menu Item Schedule',
    },
  },
  {
    path: 'menu-set',
    component: MenuSetComponent,
    data: {
      title: 'Menu Set',
    },
  },
  {
    path: 'modifier-item',
    component: ModifierItemComponent,
    data: {
      title: 'Modifier Item',
    },
  },
  {
    path: 'mpcs-header',
    component: MpcsHeaderComponent,
    data: {
      title: 'MPCS Header',
    },
  },
  {
    path: 'mpcs-detail',
    component: MpcsDetailComponent,
    data: {
      title: 'MPCS Detail',
    },
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    data: {
      title: 'Supplier',
    },
  },
  {
    path: 'item-supplier',
    component: ItemSupplierComponent,
    data: {
      title: 'Item Supplier',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
