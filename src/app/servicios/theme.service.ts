import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Articulo } from '../models/article.interface'
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public ArticuloDocument:AngularFirestoreDocument<Articulo>;
  public AritucloCollection:AngularFirestoreCollection<Articulo>;
  constructor(public db:AngularFirestore) { 

  }

  getArticle(id:string){
    this.ArticuloDocument = this.db.collection('articulos').doc(id);
    return this.ArticuloDocument.valueChanges();
  }
}
