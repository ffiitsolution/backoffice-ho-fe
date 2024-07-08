// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component'; 
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guard/auth.guard'; 

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: LayoutComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }