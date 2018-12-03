import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Articulo } from '../models/article.interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  public articulosCollection:AngularFirestoreCollection<Articulo>;

  constructor(public db:AngularFirestore) { }

  public searchArticle(palabra:string){
    this.articulosCollection = this.db.collection<Articulo>('articulos',ref=> ref.where('nombreArticulo','==',palabra).orderBy('fechaPublicacion'))
    return this.articulosCollection.valueChanges();
  }
}
