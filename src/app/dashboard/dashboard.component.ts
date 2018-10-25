import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import * as Quill from 'quill';
import { OPTIONS } from '../core/editor/configuration-editor';
import { SigninService } from '../servicios/signin.service'
import { NgForm } from '@angular/forms'; 
import { Usuario } from '../models/usuarios.interface';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public rol = {
    estudiante:true,
    maestro:false
  }
  public op = {
    perfil:true,
    articulos:false
  }

  public articulos = [1,2,3,4,5,6,7,8,9]
  
  constructor(public _regService:SigninService) { 
  
  }


  ngOnInit() {
    
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
      }
    }else if(type == 1){
      if(this.op.perfil == false){
        this.op.perfil = true;
        this.op.articulos = false;
      }
    }
    console.log("Roles", this.rol);
  }
  registrarUsuario(form:NgForm){
    console.log(form.value);
    console.log(form.valid);
  }

}
