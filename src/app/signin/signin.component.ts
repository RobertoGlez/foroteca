import { Component, OnInit } from '@angular/core';
import { SigninService } from '../servicios/signin.service'
import { NgForm } from '@angular/forms'; 
import { uRegistro } from '../models/usuarios.interface';
import { universidad } from '../core/universidad.carreras';
import { grados } from '../core/universidad.grados';
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
  public year;
  public u = universidad;
  public g = grados;
  public divisionIndex = 0;
  constructor(public _regService:SigninService) { 
    console.log("Universidad Data:" , this.u);
    
    
  }

  ngOnInit(){
    var year = new Date();
    this.year = year.getFullYear();
    console.log(this.year)
   
  }
  changeDivision(index){
    this.divisionIndex = index;
    console.log("Index division", this.divisionIndex)
    console.log("Obj", this.u[this.divisionIndex])
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
    var c;
    if(form.valid){
      console.log(form.value);
      if(this.rol.estudiante){
        c = JSON.parse(form.value.carrera)
      }else{
        c = JSON.parse(form.value.grado)
      }
      
      console.log("carrera json: ",c);
      
    }else{
      console.log("Error form no valido");
    }
   
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
