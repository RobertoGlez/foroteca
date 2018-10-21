import {  RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeComponent } from './theme/theme.component'
import { ArticleComponent } from './article/article.component';

const APP_ROUTES : Routes = [
    {path:'inicio', component:HomeComponent},
    {path:'acceder', component:LoginComponent},
    {path:'registrarse',component:SigninComponent},
    {path:'mi-panel',component:DashboardComponent},
    {path:'tema',component:ThemeComponent},
    {path:'articulo',component:ArticleComponent},
    {path:'**', pathMatch:'full',redirectTo:'/inicio'}

];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});