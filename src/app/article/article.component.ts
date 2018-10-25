import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import { OPTIONS } from '../core/editor/configuration-editor';
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
  private newArticle:Articulo = undefined;
  public contenedor:HTMLElement;
  
  public salida:HTMLElement;
  public editor;
  public c = false;
  public options = {
    modules: {
      toolbar: OPTIONS
    },
    placeholder: 'Escriba su articulo...',
    theme: 'snow',
  }
  
  public login = false;

  public transformer = new Formatter();
  constructor(public auth:AuthService) { }

  ngOnInit() {
    console.log("Fecha",moment().format("YYYY-MM-DD HH:mm:ss"))
    // this.salida = document.getElementById('salida')
    // console.log(this.contenedor);
    
    
    var logueago = this.verificarLogin()
    logueago.then(usuario=>{
      console.log("Se encontro usuario",usuario);
      this.login = true;
      setTimeout(()=>{
        this.contenedor  = document.getElementById('editor');
        console.log(this.contenedor);
        this.editor = new Quill(this.contenedor, this.options);
      },1000);
     
    }).catch(erro=>{
      console.log("Error: ",erro);
    }) 
  }

  verificarLogin(){
    var count = 0;
    return new Promise((resolve,reject)=>{
      var maxP = 10 
      
      var i = setInterval(()=>{

        if(this.auth.dataUser){
          clearInterval(i);
          resolve(this.auth.dataUser);
        }
  
        if(count == maxP){
          clearInterval(i)
          reject("No se encontro session");
        }
        count ++;
        
      },500);
     
    });
  }

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


