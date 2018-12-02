import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { SigninService } from '../servicios/signin.service'
import { NgForm } from '@angular/forms'; 
import { Usuario } from '../models/usuarios.interface';
import * as $ from 'jquery';
import swal from 'sweetalert';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public login = false;
  public cargando = true;
  public subiendo = false;
  public usuario:Usuario;
  public rol = {
    estudiante:true,
    maestro:false
  }
  public op = {
    perfil:true,
    articulos:false,
    bio:false
  }

  public articulos = [1,2,3,4,5,6,7,8,9]
  
  constructor(public _auth:AuthService,) { 
  
  }


  ngOnInit() {
    this._auth.LoginStatus().then((login)=>{
      this.cargando = false;
      this.login = true;
      this.usuario = this._auth.dataUser;
    }).catch(err=>{
      this.login = false;
      this.cargando = false;
      console.log("Hubo un error:",err);
    });
  }

  changeRol(type:number){
    if(type == 0){
      if(this.rol.maestro == false){
        this.rol.maestro = true;
        this.rol.estudiante = false;
      }
    }else if(type == 1){
      if(this.rol.estudiante == false){
        this.rol.estudiante = true;
        this.rol.maestro = false;
      }
    }
    console.log("Roles", this.rol);
  }
  changeOP(type:number){
    if(type == 0){
      if(this.op.articulos == false){
        this.op.articulos = true;
        this.op.perfil = false;
        this.op.bio = false;
      }
    }else if(type == 1){
      if(this.op.perfil == false){
        this.op.perfil = true;
        this.op.articulos = false
        this.op.bio = false;
      }
    }else if(type == 2){
      if(this.op.bio == false){
        this.op.bio = true;
        this.op.articulos = false;
        this.op.perfil = false;
      }
    }
    console.log("Roles", this.rol);
  }
  registrarUsuario(form:NgForm){
    this.subiendo = true;
    console.log(form.value);
    console.log(this.usuario);

    if(form.valid){
      console.log("enviando...")
      this._auth.UpdateInfo(this.usuario).then(newDoc=>{
        console.log(newDoc)
        this.subiendo = false;
        swal("Informacion Actualizada correctamente");
      }).catch(error=>{
        console.log("Error ",error);
        swal("Hubo un error al actualizar!")
      })
    }
  }

  // updateBio(form:NgForm){
  //   console.log(form.value);
  //   console.log(form.valid);
  // }
}