import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//Rutas
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';



//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//Enviroment
import { environment } from '../environments/environment';
import { ArticleComponent } from './article/article.component';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    SigninComponent,
    ArticleComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), //For firebase config
    AngularFireDatabaseModule, // for database
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
