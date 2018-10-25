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

  constructor(public auth:AuthService,private _route:Router) { }

  ngOnInit() {
    this.auth._firebaseAuth.authState.subscribe(u=>{
      if(u){
        // console.log("Usuario validado en memoria", u);
        console.log("Saliendo");
        this._route.navigate(['/inicio']);
      }else{
        console.log("Sin usuario");
      }
    });
  }

  iniciarSesion(login:NgForm){
    if(login.valid){
      console.log("Valido",login.value);
      this.auth.login(login.value.correo,login.value.pass);
    }else{
      console.error("No valido");
    }
  }
  // salir(){
  //   console.log("Saliendo..")
  //   this.auth.signOut();
  // }

}
