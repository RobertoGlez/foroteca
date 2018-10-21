import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import { OPTIONS } from '../core/editor/configuration-editor';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public contenedor:HTMLElement;
  public editor;
  public options = {
    modules: {
      toolbar: OPTIONS
    },
    placeholder: 'Escriba su articulo...',
    theme: 'snow',
  }
  constructor() { }

  ngOnInit() {
    this.contenedor  = document.getElementById('editor');
    console.log(this.contenedor);
    this.editor = new Quill(this.contenedor, this.options);
  }

  enviar(){
    console.log("Enviando");
    console.log("Data:", this.editor.getContents());
  }

}
