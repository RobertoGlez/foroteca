//Angular
import { Component, OnInit } from '@angular/core';
//Externos

//Servicios
import { HomeService } from '../servicios/home.service';
//Modelos
import { Articulo } from '../models/article.interface';
//Otros
import { TimeAgo } from '../pipes/timeago.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cargando = true;
  public empty = false;
  public articulos:Articulo[] = undefined;

  constructor(public homeService:HomeService) { }

  ngOnInit() {
    //Obtener todos los articulos
    this.homeService.getLastArticles().subscribe(articulos=>{
      console.log("Articulos", articulos);
      if(articulos.length > 0){
        this.empty = false;
        this.articulos = articulos;
      }else{
        this.empty = true;
      }
      this.cargando = false;
    });
  }

}
