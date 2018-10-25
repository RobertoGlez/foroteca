import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms' 
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
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
