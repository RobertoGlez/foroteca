import {  RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const APP_ROUTES : Routes = [
    {path:'inicio', component:HomeComponent},
    {path:'acceder', component:LoginComponent},
    {path:'registrarse',component:SigninComponent},
    {path:'mipanel',component:DashboardComponent},
    {path:'**', pathMatch:'full',redirectTo:'/inicio'}

];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});