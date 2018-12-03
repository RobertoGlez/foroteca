import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../models/article.interface';
import { BusquedaService } from '../servicios/busqueda.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public palabra = "";
  public cargando = true;
  public sinResultados = false;
  public ResultadosNumber = 0;
  public articulos:Articulo[];


  constructor(public _activeRouter:ActivatedRoute, public _searchEngine:BusquedaService) { }

  ngOnInit() {
    this.palabra = this._activeRouter.snapshot.params['clave'];

    this._searchEngine.searchArticle(this.palabra).subscribe(collection=>{
      console.log("Encontrados",collection);
      if(collection.length > 0){
        this.ResultadosNumber = collection.length;
        this.articulos = collection;
      }else{
        this.sinResultados = true;
      }
      this.cargando = false;
    })
    
  }

}
