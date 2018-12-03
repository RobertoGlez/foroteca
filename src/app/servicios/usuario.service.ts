import { Injectable } from '@angular/core';
import { AngularFirestoreDocument,AngularFirestoreCollection,AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../models/usuarios.interface';
import { Articulo } from '../models/article.interface';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuarioDocument:AngularFirestoreDocument<Usuario>;
  public articulosCollection:AngularFirestoreCollection<Articulo>;
  private Today;
  constructor( public db:AngularFirestore ) { 

  }
  public getUserInfo(uid:string){
    this.usuarioDocument = this.db.collection<Usuario>('usuarios').doc(uid);
    return this.usuarioDocument.valueChanges();
  }

  public getUserArticles(uid:string){
    this.Today = moment().format("YYYY-MM-DD HH:mm:ss");
    this.articulosCollection = this.db.collection<Articulo>('articulos', ref=>ref.where('autor.uid','==',uid).where('fechaPublicacion', '<=', this.Today).orderBy('fechaPublicacion','desc').limit(10));
    return this.articulosCollection.valueChanges();
  }
}
