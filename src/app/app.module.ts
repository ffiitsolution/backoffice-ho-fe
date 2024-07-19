// App Angular Global Set
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './config/app.config';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GlobalComponent } from './views/master/global/global.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { OutletComponent } from './views/master/outlet/outlet.component';
import { DialogCrudDataComponent } from './shared/dialog-crud-data/dialog-crud-data.component';

// Other Library
import { NgSelectModule } from '@ng-select/ng-select';
import { GlobalFormComponent } from './views/master/global/global-form/global-form.component';


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
    GlobalFormComponent
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
    NgSelectModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AppConfig,
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
    provideAnimationsAsync(),
    { 
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: {duration: 5000}
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
