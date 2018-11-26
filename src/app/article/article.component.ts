//Angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
//Librerias/Framewors
import * as Quill from 'quill';
import Tagify from '@yaireo/tagify';
import swal from 'sweetalert';
import * as moment from 'moment';
//Archivos estaticos
import { WHITELIST, BLACKLIST } from '../core/editor/whitelist-tags';
import { OPTIONS } from '../core/editor/configuration-editor';
import { universidad } from '../core/universidad.carreras'

// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';npm install quill-delta-to-html
import { Formatter } from 'delta-transform-html'

//Interfaces
import { Articulo } from '../models/article.interface';
import { Usuario } from '../models/usuarios.interface';
//Servicios
import { ArticleService } from '../servicios/article.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public cargando = true;
  public login = false;
  public publicando =  false;

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

  //Opciones de editor
  public options = {
    modules: {
      toolbar: OPTIONS
    },
    placeholder: 'Escriba su articulo...',
    theme: 'snow',
  }
  

  public transformer = new Formatter();
  constructor(public auth:AuthService,
    public articleService:ArticleService,
    public _router:Router) {

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
        this.publicando = true;
        this.newArticle = {
          contenido:articulo,
          fechaPublicacion:moment().format("YYYY-MM-DD HH:mm:ss"),
          nombreArticulo:form.value.titulo,
          tags: tags,
          autor:{
            nombre:this.auth.dataUser.nombre + " " + this.auth.dataUser.apellidos,
            carrera:this.getCarrer(this.auth.dataUser),
            tipo:this.auth.dataUser.tipo
          }
        }
        //guardar en base de datos
        console.log("Nuevo articulo",this.newArticle)
        this.articleService.addArticle(this.newArticle).then(subido=>{
          console.log("Se subio correctamente");
          this.publicando = false;
          swal({
            title: "Articulo Publicado",
            text: "Tu articulo se publico con exito!",
            icon: "success",
            buttons:"Continuar"
          }).then(aceptar=>{
            this._router.navigate(["/inicio"])
          });
        }).catch(error=>{
          console.error("Hubo un error", error)
          swal("Hubo un errror!");
        });
        
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
        swal({
          title: "¡Un momento!",
          text: "Este articulo es demasiado corto ¿No crees?, vamos puedes hacerlo mejor!",
          buttons:"Me esforzaré"
        });
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
      swal({
        title: "Un momento!",
        text: "Tus lectores no te encontraran, si no le das palabras clave sobre el tema, ¡Ayudalos!",
        buttons:"Pondre tags"
      });
      return;
    }
  }

  
}


