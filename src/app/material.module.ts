import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [],
    exports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatSidenavModule,
      MatListModule
    ],
  })
  export class MaterialModule {}