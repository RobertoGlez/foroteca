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
  public uni = universidad;
  public division = 0;
  
  private newArticle:Articulo = undefined;

  //Tagify 
  public input:HTMLElement;
  public tagify;

  //Quilljs
  public contenedor:HTMLElement;
  //iniciar editor
  public editor;


  // public salida:HTMLElement;
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

   

    console.log("Fecha",moment().format("YYYY-MM-DD HH:mm:ss"))
    // this.salida = document.getElementById('salida')
    // console.log(this.contenedor);
    
    
    this.auth.LoginStatus().then(login=>{
      console.log("Se encontro usuario",login);
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
      console.log(this.tagify)
      },250);

    }).catch(erro=>{
      this.login = false;
      this.cargando = false;
      console.log("Error: ",erro);
    }) 
  }


  // Deprecated!!
  // verificarLogin(){
  //  return new Promise ((resolve,reject)=>{
  //   let logueado = this.auth.userLoginState.subscribe(estado=>{
  //     if(estado){
  //       var veces = 0;
  //       var intentos = 10;
  //       var i = setInterval(()=>{
  //         if(this.auth.dataUser){

  //         }
  //       },500);
  //     }
  //   });
  //  });
  // }

  enviar(){
    
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

  guardarArticulo(form:NgForm){
    console.log(form.value)
    if(form.valid){ 
      console.log("valido");

      // this.newArticle.contenido = this.editor.getContents();
      // this.newArticle.fechaPublicacion = moment().format("YYYY-MM-DD HH:mm:ss");
      // this.newArticle.nombreArticulo = form.value.nombreArticulo;
      // this.newArticle.tags = form.value.tags;
      // this.newArticle.autor.nombre = this.auth.dataUser.nombre + " " + this.auth.dataUser.apellidos;
      // this.newArticle.autor.carrera = this.getCarrer(this.auth.dataUser);
      this.newArticle = {
        contenido:this.editor.getContents(),
        fechaPublicacion:moment().format("YYYY-MM-DD HH:mm:ss"),
        nombreArticulo:form.value.nombreArticulo,
        tags: form.value.tags.split(","),
        autor:{
          nombre:this.auth.dataUser.nombre + " " + this.auth.dataUser.apellidos,
          carrera:this.getCarrer(this.auth.dataUser),
          tipo:this.auth.dataUser.tipo
        }
      }
      console.log("Nuevo articulo",this.newArticle);
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
      // Maaestro
      name = user.grado.abr + " en " + user.titulo; 
    }
    return name;
  }

}


