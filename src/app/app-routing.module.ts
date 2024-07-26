// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    title: 'Home',
                },
            },
            {
                path: 'master',
                loadChildren: () => import('./views/master/master.module').then((m) => m.MasterModule )
            },
            {
                path: 'transaction',
                loadChildren: () => import('./views/transaction/transaction.module').then((m) => m.TransactionModule )
            },
            {
                path: 'report',
                loadChildren: () => import('./views/report/report.module').then((m) => m.ReportModule )
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
