import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import Tagify from '@yaireo/tagify';

import { WHITELIST, BLACKLIST } from '../core/editor/whitelist-tags';
import { OPTIONS } from '../core/editor/configuration-editor';
import { universidad } from '../core/universidad.carreras'
import { NgForm } from '@angular/forms';
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';npm install quill-delta-to-html
import { Formatter } from 'delta-transform-html'
import { Articulo } from '../models/article.interface';
import { Usuario } from '../models/usuarios.interface';
import { ArticleService } from '../servicios/article.service';
import { AuthService } from '../servicios/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public cargando = true;
  public login = false;

  //Variables de las carreras
  public uni = universidad;
  public division = 0;
  
  //Articulo
  private newArticle:Articulo = undefined;

  //Tagify 
  public input:HTMLElement;
  public tagify;

  //Quilljs

  public contenedor:HTMLElement;
  //iniciar editor
  public editor;
  // public vistaPrevia:HTMLElement;

  //Oppciones de editor
  public options = {
    modules: {
      toolbar: OPTIONS
    },
    placeholder: 'Escriba su articulo...',
    theme: 'snow',
  }
  

  public transformer = new Formatter();
  constructor(public auth:AuthService) {

  }
  changeDivision(index){
    this.division = index
  }

  ngOnInit() {
    // this.salida = document.getElementById('salida')

    this.auth.LoginStatus().then(login=>{
      // console.log("Se encontro usuario",login);
      this.login = true;
      this.cargando = false;
      
      //Cargas Quilljs
      setTimeout(()=>{
        this.contenedor = document.getElementById('editor');
        this.editor = new Quill(this.contenedor,this.options);

        //Cargar Tags
        this.input = document.querySelector('input[name=tags]');
        this.tagify = new Tagify(this.input, {
          whitelist : WHITELIST ,
          blacklist : BLACKLIST
        });
        // console.log(this.tagify);
      },250);

    }).catch(erro=>{
      this.login = false;
      this.cargando = false;
      console.log("Error: ",erro);
    }) 
  }

  //Pendiente
  vistaPrevia(){
    
    return this.editor.getContents();
    // this.guardarArticulo(delta);
    // var html = this.transformer.transform(delta);
    // console.log(html)
    // // console.log("Child",this.editor.root)
    // // var edit = new Quill(this.salida);
    // // console.log(edit.setContents(delta));
    
    // // var converter = new QuillDeltaToHtmlConverter(delta)
    
    // console.log("Convertido",)
    // this.salida.innerHTML = html ;
  }

  //Recibimos el formulario

  guardarArticulo(form:NgForm){
    // console.log(form)
    // console.log(this.tagify.value);
    if(form.valid){ 
      console.log("valido");

      let articulo = this.validArticle(this.editor.getContents());
      let tags = this.validTags(this.tagify.value);
      if(articulo){
        this.newArticle = {
          contenido:articulo,
          fechaPublicacion:moment().format("YYYY-MM-DD HH:mm:ss"),
          nombreArticulo:form.value.nombreArticulo,
          tags: tags,
          autor:{
            nombre:this.auth.dataUser.nombre + " " + this.auth.dataUser.apellidos,
            carrera:this.getCarrer(this.auth.dataUser),
            tipo:this.auth.dataUser.tipo
          }
        }
        console.log("Nuevo articulo",this.newArticle);
      }else{
        console.log("El articulo no es valido");
      }
      
      
    }else{
      console.log("Error no valido");
    }
      
    }

  getCarrer(user:Usuario){
    var name = "";
    if(user.tipo == "estudiante"){
        //Estudiantes
      name = user.carrera.abr + " en " + user.carrera.label;
    }else{
      // Maestro
      name = user.grado.abr + " en " + user.titulo; 
    }
    return name;
  }

  //Funciones para validar elementos
  
  validArticle(articulo){
    let art = []
    art = articulo.ops;
    console.log("Contenido",art);
    if(art.length == 1){
      if(art[0].insert.length > 10){
        return art
      }else{
        alert("Parece ser que su articulo es demasiado corto, vamos puedes hacerlo mejor");
        return;
      }
    }else if (art.length > 2){
      return art;
    }else{
      return;
    }

  }

  validTags(Tags){
    if(Tags.length > 0){
      return Tags
    }else{
      alert("Tus lectores no te encontraran si no pones tags.")
      return;
    }
  }
}


