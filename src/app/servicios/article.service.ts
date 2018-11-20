import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articleCollection
  constructor(private db:AngularFirestore) { }

  public addArticle(){
    
  }
}


