import { Injectable } from '@angular/core';
//Firebase
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
//Tools
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Articulo } from '../models/article.interface'; 
import { Usuario } from '../models/usuarios.interface';

 
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public ArticleCollection:AngularFirestoreCollection<Articulo>;
  public UserCollection:AngularFirestoreCollection<Usuario>;

  // public ArticleObservable:Observable<Articulo>
  public Today;
  constructor(public db:AngularFirestore) { }
  getLastArticles(){
    this.Today = moment().format("YYYY-MM-DD HH:mm:ss");
    this.ArticleCollection = this.db.collection<Articulo>('articulos',ref=>ref.where('fechaPublicacion','<=', this.Today ).orderBy('fechaPublicacion','desc').limit(10));

    return this.ArticleCollection.valueChanges()
  }
  getLastUsers(){
    this.Today = moment().format("YYYY-MM-DD HH:mm:ss");
    this.UserCollection = this.db.collection<Usuario>('usuarios',ref=>ref.where('fechaConexion','<=', this.Today ).orderBy('fechaConexion','desc').limit(5));
    return this.UserCollection.valueChanges();
  }
}
