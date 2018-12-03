//Angular
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert'
//Externos

//Servicios
import { HomeService } from '../servicios/home.service';
//Modelos
import { Articulo } from '../models/article.interface';
//Otros
import { TimeAgo } from '../pipes/timeago.pipe';
import { Usuario } from '../models/usuarios.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public palabraClave:string = "";
  public cargandoArticulos = true;
  public cargandoUsuarios = true;
  public emptyArticulos = false;
  public emptyUsuarios = false;
  public articulos:Articulo[];
  public usuarios:Usuario[];
  constructor(public homeService:HomeService,public _router:Router) { }

  ngOnInit() {
    //Obtener todos los articulos
    this.homeService.getLastArticles().subscribe(articulos=>{
      console.log("Articulos", articulos);
      if(articulos.length > 0){
        this.emptyArticulos = false;
        this.articulos = articulos;
      }else{
        this.emptyArticulos = true;
      }
      this.cargandoArticulos = false;
    });

    this.homeService.getLastUsers().subscribe(usuarios=>{
      console.log("Usuarios >", usuarios);
      if(usuarios.length > 0){
        this.emptyUsuarios = false;
        this.usuarios = usuarios;
      }else{
        this.emptyUsuarios = true;
      }
      this.cargandoUsuarios = false;
    })
  }

  buscar(formulario:NgForm){
    console.log("Buscando",formulario);
    console.log("Palabra",formulario.value)
    let clave = formulario.value.palabra.trim()
    if(clave){
      this._router.navigate(['/busqueda',clave]);
    }else{
      swal("Debe poner alguna palabra para buscar!")
    }
  }

}
