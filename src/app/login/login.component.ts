import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' 
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginStatus = false;
  constructor(public auth:AuthService,private _route:Router) { }

  ngOnInit() {
    this.auth._firebaseAuth.authState.subscribe(u=>{
      if(u){
        // console.log("Usuario validado en memoria", u);
        console.log("Denegado a Login, ya tiene session iniciada");
        this._route.navigate(['/inicio']);
      }else{
        console.log("No hay usuario");
      }
    });
  }

  iniciarSesion(login:NgForm){
    if(login.valid){
      this.loginStatus = true;
      this.auth.login(login.value.correo,login.value.pass).then(login=>{
        console.log(login);
      }).catch(error=>{
        console.log("Component: ",error);
      });
    }else{
      console.error("No valido");
    }
  }
  

}
