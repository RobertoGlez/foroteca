import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
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
  
  //Deprecated

  // Statelogin(){
  //   console.log("Estado de auth ", this.auth.userLoginState);
  //   return new Promise((resolve,reject)=>{

  //     let logued = this.auth.userLoginState.subscribe(estado=>{
  //       // console.log("Estado del login", estado)
  //       if(estado){
  //         var veces = 0
  //         var intentos = 14
  //         var i = setInterval(()=>{
  //           if(this.auth.dataUser){
  //             clearInterval(i)
  //             resolve(true);
  //           }
  //           if(veces > intentos){
  //             clearInterval(i)
  //             reject("No se encontraron datos en la base de datos")
  //           }
  //           console.log("Veces", veces)
  //           veces ++;
  //         },500);
          
  //       }else{
  //         reject("No se encontro session iniciada en el fireaut Document")
  //         console.log("No logueado")
  //       }
  //       logued.unsubscribe
  //     })

      
  //   });
    
    
  // }


  cerrarSession(){
    var confirmar = confirm("¿Desea cerrar session?")
    if(confirmar){
      this.auth.signOut();
    }
  }
}
