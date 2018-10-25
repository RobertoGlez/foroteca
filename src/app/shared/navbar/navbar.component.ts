import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../models/usuarios.interface'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // public userNav:Usuario
  constructor(public auth:AuthService) { 
    
  }

  ngOnInit() {
    
  }


  login(){
    // this.auth.login();
  }
  cerrarSession(){
    var confirmar = confirm("¿Desea cerrar session?")
    if(confirmar){
      this.auth.signOut();
    }
  }
}
