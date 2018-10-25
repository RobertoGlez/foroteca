import { Component, OnInit } from '@angular/core';
import { SigninService } from '../servicios/signin.service'
import { NgForm } from '@angular/forms'; 
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../models/usuarios.interface';
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
  public registrando = false;
  public pass = false;
  constructor(public _regService:SigninService,private atuhS:AuthService) { 
    // console.log("Universidad Data:" , this.u);
  }

  ngOnInit(){
    var year = new Date();
    this.year = year.getFullYear();
    console.log(this.year)
   
  }

  changeDivision(index){
    this.divisionIndex = index;
    // console.log("Index division", this.divisionIndex)
    // console.log("Obj", this.u[this.divisionIndex]);
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
    // console.log("Roles", this.rol);
  }

  

  registrarUsuario(form:NgForm){
    
    console.log(form)
   
    if(form.valid && form.value.password === form.value.password2 ){
      var newUser:Usuario = {
        nombre:form.value.nombre,
        apellidos:form.value.apellidos,
        email:form.value.email,
        division:form.value.division,
        tipo:form.value.rol,
      }
      console.log(form.value);
      if(this.rol.estudiante){
        newUser.carrera = JSON.parse(form.value.carrera)
        newUser.cuatrimestre = form.value.cuatrimestre;
      }else{
        
        newUser.grado = JSON.parse(form.value.grado);
        newUser.titulo = form.value.titulo
      }
      console.log("Usuario: ",newUser);
      //Empezar formato de registro
      this.atuhS.singIn(newUser.email,form.value.password,newUser);
    }else if(form.value.password !== form.value.password2){
      alert("Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
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
