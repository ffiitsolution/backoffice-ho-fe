// App Angular Global Set
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './config/app.config';
import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
    NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Material UI Module
import { MaterialModule } from './material.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// Layout Component
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

// Shared Component
import { ButtonSharedComponent } from './shared/button/button.component';
import { DialogConfirmationComponent } from './shared/dialog-confirmation/dialog-confirmation.component';

// Table Module
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';

// View Component
import { LoginComponent } from './views/auth/login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BrandComponent } from './layout/brand/brand.component';
import { SideBarItemComponent } from './layout/sidebar/sidebar-item/sidebar-item.component';
import {
    DatePipe,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { GlobalComponent } from './views/master/global/global.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { OutletComponent } from './views/master/outlet/outlet.component';
import { DialogCrudDataComponent } from './shared/dialog-crud-data/dialog-crud-data.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { ItemSupplierComponent } from './views/master/item-supplier/item-supplier.component';
import { MenuItemComponent } from './views/master/menu-item/menu-item.component';
import { MenuItemLimitComponent } from './views/master/menu-item-limit/menu-item-limit.component';
import { MenuItemScheduleComponent } from './views/master/menu-item-schedule/menu-item-schedule.component';
import { MenuSetComponent } from './views/master/menu-set/menu-set.component';
import { MpcsDetailComponent } from './views/master/mpcs-detail/mpcs-detail.component';
import { MpcsHeaderComponent } from './views/master/mpcs-header/mpcs-header.component';
import { SupplierComponent } from './views/master/supplier/supplier.component';
import { PaymentMethodComponent } from './views/master/payment/payment-method/payment-method.component';
import { MasterPaymentComponent } from './views/master/payment/master-payment/master-payment.component';
import { PaymentMethodLimitComponent } from './views/master/payment/payment-method-limit/payment-method-limit.component';
import { DashboardMasterComponent } from './views/master/dashboard-master/dashboard-master.component';
import { DashboardTransactionComponent } from './views/transaction/dashboard-transaction/dashboard-transaction.component';
import { HomeComponent } from './views/home/home.component';
import { AllReportComponent } from './views/report/all-report/all-report.component';
import { SendMasterComponent } from './views/report/send-master/send-master.component';
import { RecipeProductComponent } from './views/master/recipe/recipe-product/recipe-product.component';
import { RecipeHeaderComponent } from './views/master/recipe/recipe-header/recipe-header.component';
import { RecipeHeaderFormComponent } from './views/master/recipe/recipe-header/recipe-header-form/recipe-header-form.component';
import { RecipeDetailComponent } from './views/master/recipe/recipe-detail/recipe-detail.component';
import { RecipeDetailFormComponent } from './views/master/recipe/recipe-detail/recipe-detail-form/recipe-detail-form.component';
import { RecipeProductFormComponent } from './views/master/recipe/recipe-product/recipe-product-form/recipe-product-form.component';
import { MenuGroupComponent } from './views/master/menu/menu-group/menu-group.component';
import { MenuGroupLimitComponent } from './views/master/menu/menu-group-limit/menu-group-limit.component';
import { MenuGroupFormComponent } from './views/master/menu/menu-group/menu-group-form/menu-group-form.component';
import { BaseChartDirective } from 'ng2-charts';
import { MasterPriceComponent } from './views/master/price/price.component';
import { MasterPriceFormComponent } from './views/master/price/price-form/price-form.component';
import { ModifierItemComponent } from './views/master/modifier/modifier-item/modifier-item.component';
import { MasterModifierPriceComponent } from './views/master/modifier/modifier-price/modifier-price.component';
import { MasterModifierPriceFormComponent } from './views/master/modifier/modifier-price/modifier-price-form/modifier-price-form.component';

// Form
import { GlobalFormComponent } from './views/master/global/global-form/global-form.component';
import { PaymentMethodLimitFormComponent } from './views/master/payment/payment-method-limit/payment-method-limit-form/payment-method-limit-form.component';
import { MenuGroupLimitFormComponent } from './views/master/menu/menu-group-limit/menu-group-limit-form/menu-group-limit-form.component';

// Other Library
import { NgSelectModule } from '@ng-select/ng-select';
import { RegexPipe } from './services/input.pipe';
import { NavigationService } from './services/navigation.service';
import { ErrorHelper } from './helper/error.helper';
import {
    MAT_DATE_LOCALE,
    provideNativeDateAdapter,
} from '@angular/material/core';
import { MasterColorComponent } from './views/master/color/color.component';
import { MasterDiscountMethodComponent } from './views/master/discount-method/discount-method.component';

export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.load();
}

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        ButtonSharedComponent,
        NavbarComponent,
        SidebarComponent,
        BrandComponent,
        SideBarItemComponent,
        GlobalComponent,
        OutletComponent,
        DataTableComponent,
        DialogConfirmationComponent,
        DialogCrudDataComponent,
        GlobalFormComponent,
        ItemSupplierComponent,
        MenuItemComponent,
        MenuItemLimitComponent,
        MenuItemScheduleComponent,
        MenuSetComponent,
        ModifierItemComponent,
        MpcsDetailComponent,
        MpcsHeaderComponent,
        MasterPaymentComponent,
        PaymentMethodComponent,
        PaymentMethodLimitComponent,
        SupplierComponent,
        HomeComponent,
        DashboardMasterComponent,
        DashboardTransactionComponent,
        AllReportComponent,
        HomeComponent,
        SendMasterComponent,
        PaymentMethodLimitFormComponent,
        RecipeHeaderComponent,
        RecipeHeaderFormComponent,
        PaymentMethodLimitFormComponent,
        RecipeDetailComponent,
        RecipeProductComponent,
        RecipeDetailFormComponent,
        RecipeProductFormComponent,
        MenuGroupComponent,
        MenuGroupLimitComponent,
        MenuGroupFormComponent,
        MenuGroupLimitFormComponent,
        MasterModifierPriceComponent,
        MasterModifierPriceFormComponent,
        MasterPriceComponent,
        MasterPriceFormComponent,
        MasterColorComponent,
        MasterDiscountMethodComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        DataTablesModule,
        NgSelectModule,
        BaseChartDirective
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        AuthGuard,
        AuthService,
        NavigationService,
        AppConfig,
        DatePipe,
        RegexPipe,
        ErrorHelper,
        provideHttpClient(),
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'id-ID' },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true,
        },
        provideAnimationsAsync(),
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 5000 },
        },
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
