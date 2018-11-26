import { Injectable } from '@angular/core';
import { Articulo } from '../models/article.interface'
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articleCollection:AngularFirestoreCollection;
  public articleDoc:AngularFirestoreDocument;

  constructor(private db:AngularFirestore) { }

  public addArticle(newArticle:Articulo){
    this.articleCollection = this.db.collection('articulos');
    return new Promise((resolve,reject)=>{
      this.articleCollection.add(newArticle).then(documento=>{
        console.log("Creando documento",documento.id);

        this.articleDoc = this.db.collection('articulos').doc(documento.id);
        this.articleDoc.update({
          idArticulo:documento.id
        }).then(subido=>{
          console.log("Documento agregado con exito", subido);
          resolve(true);
        });
      }).catch(error=>{
        reject("No se creo el documento");
        console.error("Error en la consulta :", error)
      });
    });
  }
}


