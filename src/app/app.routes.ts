import {  RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeComponent } from './theme/theme.component'
import { ArticleComponent } from './article/article.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { UsuarioComponent } from './usuario/usuario.component';

const APP_ROUTES : Routes = [
    {path:'inicio', component:HomeComponent},
    {path:'acceder', component:LoginComponent},
    {path:'registrarse',component:SigninComponent},
    {path:'mi-panel',component:DashboardComponent},
    {path:'tema',component:ThemeComponent},
    {path:'nuevo-articulo',component:ArticleComponent},
    {path:'usuario',component:UsuarioComponent},
    {path:'no-encontrado',component:NopagefoundComponent},
    {path:'',pathMatch:'full',redirectTo:'/inicio'},
    {path:'**', redirectTo:'/no-encontrado'}
    // {path:'**', pathMatch:'full',redirectTo:'/inicio'}

];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});