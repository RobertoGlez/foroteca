import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'  
import { AuthService } from '../servicios/auth.service'
import { UsuarioService } from '../servicios/usuario.service'

import { DATOS } from '../core/static-data'

import { Usuario } from '../models/usuarios.interface';
import { Articulo } from '../models/article.interface';
import { DateFtPipe } from "../pipes/date-ft.pipe";
import { TimeAgo } from '../pipes/timeago.pipe'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public uid:string;
  public authId:string;
  public covers:string[] = DATOS.cover;
  public imageIndex:number = 0;
  public max = this.covers.length;
  public min = 0;

  public cargandoArticulo = true;
  public cargandoUsuario = true;

  public vacioArticulo = false;
  public errorUsuario = false;

  public usuario:Usuario
  public articulos:Articulo[];

  constructor( public _activeRouter:ActivatedRoute, public _usuarioS:UsuarioService, private _auth:AuthService) {
      this.imageIndex = Math.floor(Math.random() * (this.max - this.min)) + this.min;
   }

  ngOnInit() {
    this._auth.LoginStatus().then(login=>{
      console.log("Login estatus",login);
      this.authId = this._auth.dataUser.uid
    }).catch(err=>{
      console.error("Hubo un error en login",err);
    });
    console.log("Usuario",this._activeRouter.snapshot.params['uid'])
    this.uid = this._activeRouter.snapshot.params['uid'];

    this._usuarioS.getUserInfo(this.uid).subscribe(userDoc=>{
      console.log("Informacion del usuario",userDoc);
      if(userDoc){
        this.usuario = userDoc;
       
      }else{
        this.errorUsuario = true;
      }
      this.cargandoUsuario = false;
    });

    this._usuarioS.getUserArticles(this.uid).subscribe(articulosCollection=>{
      console.log("Articulos >",articulosCollection);
      if(articulosCollection.length > 0){
        this.articulos = articulosCollection
      }else{
        this.vacioArticulo = true;
      }

      this.cargandoArticulo = false;
    })
  }

}
