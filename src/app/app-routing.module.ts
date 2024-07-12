// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component'; 
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guard/auth.guard'; 

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule )
            },
            {
                path: 'master',
                loadChildren: () => import('./views/master/master.module').then((m) => m.MasterModule )
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }