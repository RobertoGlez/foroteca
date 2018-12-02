import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';
import { ThemeService } from '../servicios/theme.service';
import { Articulo } from '../models/article.interface';
import { TimeAgo } from '../pipes/timeago.pipe'

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  public cargando = true;
  public consulta = false;
  public articulo:Articulo;
  public editor;
  public options = {
    readOnly: true
  };
  public id:string;
  constructor(public _router:ActivatedRoute,public _themeS:ThemeService) { }

  ngOnInit() {
    console.log(this._router.snapshot.params['id']);
    this.id = this._router.snapshot.params['id'];

    this._themeS.getArticle(this.id).subscribe(doc=>{
      console.log("Articulo",doc);
      this.cargando = false;
      if(doc){
        this.articulo = doc
        this.consulta = true;
        console.log("Entro")
        setTimeout(()=>{
          this.editor = new Quill(document.getElementById('editor'),this.options);
          this.editor.setContents(this.articulo.contenido);
        },250);
  
      }
      
    });
  }

}
