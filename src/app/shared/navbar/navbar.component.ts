import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

import swal from 'sweetalert'

import { Usuario } from '../../models/usuarios.interface'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // public userNav:Usuario
  public  cargando = true;
  public login = false;
  constructor(public auth:AuthService) { 
    
    
  }

  ngOnInit() {
    


    this.auth.LoginStatus().then(login=>{
      console.log("Si tiene session")
      this.cargando = false
      this.login = true;
    
    }).catch(err=>{
      this.cargando = false;
      this.login = false;
      
      console.log("Hubo un error", err)
    });

    console.log("Cargando",this.cargando)
    console.log("Login",this.login)
  }
  

  cerrarSession(){
    // var confirmar = confirm("¿Desea cerrar session?")
    // if(confirmar){
    //   this.auth.signOut();
    // }
    swal({
      title: "Advertencia",
      text: "¿Deseas cerrar tu sesión?",
      icon: "warning",
      buttons: ["No","Si"],
      dangerMode: true,
    })
    .then((willDelete) => {

      if (willDelete) {
        this.auth.signOut();
        swal("Tu sesión ha terminado con exito, ¡hasta pronto!", {
          icon: "success",
        });
      } else {
        swal("¡Que bien que sigas con nosotros!");
      }
    });
  }
}
