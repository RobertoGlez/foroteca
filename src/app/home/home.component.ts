//Angular
import { Component, OnInit } from '@angular/core';
//Externos

//Servicios
import { HomeService } from '../servicios/home.service';
//Modelos
import { Articulo } from '../models/article.interface';
//Otros
import { TimeAgo } from '../pipes/timeago.pipe';
import { Usuario } from '../models/usuarios.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cargandoArticulos = true;
  public cargandoUsuarios = true;
  public emptyArticulos = false;
  public emptyUsuarios = false;
  public articulos:Articulo[];
  public usuarios:Usuario[];
  constructor(public homeService:HomeService) { }

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

}
