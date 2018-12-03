import { Component, OnInit } from '@angular/core';
import { SigninService } from '../servicios/signin.service';
import { NgForm } from '@angular/forms'; 
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../models/usuarios.interface';
import { universidad } from '../core/universidad.carreras';
import { grados } from '../core/universidad.grados';
import { DATOS } from '../core/static-data';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import swal from 'sweetalert'
import * as moment from 'moment'
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
  // public file = DATOS.porfilePictureDefault.user;
  
  
  //Pasar a subir la foto
  // public id_nuevoUsuario = "";
  // public registrado = true;
  constructor(public _regService:SigninService,private atuhS:AuthService,public _route:Router) { 
    // console.log("Universidad Data:" , this.u);
    
  }

  ngOnInit(){
    var year = new Date();
    this.year = year.getFullYear();
   
    // console.log(this.file);
    this.atuhS._firebaseAuth.authState.subscribe(u=>{
      if(u){
        // console.log("Usuario validado en memoria", u);
        console.log("Saliendo");
        this._route.navigate(['/inicio']);
      }else{
        console.log("Sin usuario");
      }
    });
  }

  changeDivision(index){
    this.divisionIndex = index;
    // console.log("Recibio", index);
    // console.log("Index division", this.divisionIndex)
    // console.log("Obj", this.u[this.divisionIndex]);
  }

  changeRol(type:number){
    console.log("evento click",type)
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
        division:this.u[this.divisionIndex].nombre,
        tipo:form.value.rol,
        matricula:form.value.matricula,
        picture:DATOS.porfilePictureDefault.user,
        fechaRegistro:moment().format("YYYY-MM-DD HH:mm:ss"),
        fechaConexion:moment().format("YYYY-MM-DD HH:mm:ss")
      }
      // console.log(form.value);
      if(this.rol.estudiante){
        newUser.carrera = JSON.parse(form.value.carrera)
        newUser.cuatrimestre = form.value.cuatrimestre;
      }else{
        
        newUser.grado = JSON.parse(form.value.grado);
        newUser.titulo = form.value.titulo
      }
      // console.log("Usuario: ",newUser);
      //Pasar a la foto de usuario
      this.atuhS.singIn(newUser.email,form.value.password,newUser).then((Registro:any)=>{
        // console.log(Registro);
        console.log("Registrado!")
        // if(Registro.uid){
        //   this._regService.updatePhoto(Registro.uid,this.file);
        // }
        // Registro.uid
      }).catch(Error=>{
        console.log(Error);
        swal('Error!', Error.MensajeUsuario);
      });
    }else if(form.value.password !== form.value.password2){
      swal("Las contraseñas no coinciden");
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
