import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
//tools
import { NgxContentLoadingModule } from 'ngx-content-loading';
//Componentes
import { AppComponent } from './app.component';

//Rutas
import { APP_ROUTING } from './app.routes';

//Componenetes de rutas
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

//services
import { AuthService } from './servicios/auth.service';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'


//Enviroment
import { environment } from '../environments/environment';

//Componente Generado
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { ThemeComponent } from './theme/theme.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { UsuarioComponent } from './usuario/usuario.component';

//Pipes
import { TimeAgo } from './pipes/timeago.pipe';
import { DateFtPipe } from './pipes/date-ft.pipe';
import { SearchComponent } from './search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    SigninComponent,
    ArticleComponent,
    ThemeComponent,
    NopagefoundComponent,
    UsuarioComponent,
    TimeAgo,
    DateFtPipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), //For firebase config
    AngularFireDatabaseModule, // for database
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxContentLoadingModule 
    
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
