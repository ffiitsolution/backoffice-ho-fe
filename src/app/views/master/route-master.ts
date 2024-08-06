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
import { PaymentMethodComponent } from './payment/payment-method/payment-method.component';
import { MasterPaymentComponent } from './payment/master-payment/master-payment.component';
import { PaymentMethodLimitComponent } from './payment/payment-method-limit/payment-method-limit.component';
import { DashboardMasterComponent } from './dashboard-master/dashboard-master.component';
import { RecipeHeaderComponent } from './recipe/recipe-header/recipe-header.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeProductComponent } from './recipe/recipe-product/recipe-product.component';
import { MenuGroupComponent } from './menu/menu-group/menu-group.component';
import { MenuGroupLimitComponent } from './menu/menu-group-limit/menu-group-limit.component';
import { MasterModifierPriceComponent } from './modifier-price/modifier-price.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardMasterComponent,
        data: {
            title: 'Dashboard Master',
        },
    },
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
        path: 'menu',
        data: {
            title: 'Menu',
        },
        children: [
            {
                path: '',
                redirectTo: 'menu-item',
                pathMatch: 'full',
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
                path: 'menu-group',
                component: MenuGroupComponent,
                data: {
                    title: 'Menu Group'
                }
            },
            {
                path: 'menu-group-limit',
                component: MenuGroupLimitComponent,
                data: {
                    title: 'Menu Group Limit'
                }
            }
        ]
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
        path: 'payment',
        data: {
            title: 'Payment',
        },
        children: [
            {
                path: '',
                redirectTo: 'master-payment',
                pathMatch: 'full',
            },
            {
                path: 'master-payment',
                component: MasterPaymentComponent,
                data: {
                    title: 'Master Payment',
                },
            },
            {
                path: 'payment-method',
                component: PaymentMethodComponent,
                data: {
                    title: 'Payment Method List',
                },
            },
            {
                path: 'payment-method-limit',
                component: PaymentMethodLimitComponent,
                data: {
                    title: 'Master Payment Method Limit',
                },
            },
        ],
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
    {
        path: 'recipe',
        component: RecipeHeaderComponent,
        data: {
            title: 'Master Recipe Header',
        },
    },
    {
        path: 'recipe-detail',
        component: RecipeDetailComponent,
        data: {
            title: 'Recipe Detail',
        },
    },
    {
        path: 'recipe-product',
        component: RecipeProductComponent,
        data: {
            title: 'Recipe Product',
        },
    },
    {
        path: 'modifier-price',
        component: MasterModifierPriceComponent,
        data: {
            title: 'Modifier Price',
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterRoutingModule {}
