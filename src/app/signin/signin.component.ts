import { Component, OnInit } from '@angular/core';
import { SigninService } from '../servicios/signin.service'
import { NgForm } from '@angular/forms'; 
import { uRegistro } from '../models/usuarios.interface';
import * as $ from 'jquery';
// import tooltip from 'popper.js'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public rol = {
    estudiante:true,
    maestro:false
  }
  constructor(public _regService:SigninService) { 
  
  }

  ngOnInit(){
    
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
  registrarUsuario(form:NgForm){
    console.log(form.value);
    console.log(form.valid);
  }
  //Deprecated
  revisarMatricula(){
    var matricula = $('#matricula').val();
    console.log("Revisando: ", matricula);
    if(matricula != '' || matricula != undefined){
      this._regService.searchOnUTTABDatabase(matricula).subscribe(res=>{
        console.log("Martricula",res);
      })
    }
   
  }

}
