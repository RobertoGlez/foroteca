import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uttab } from '../core/curl.uttab';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  public curl = uttab;
  private StoragePath = 'user_images'
  constructor(public http:HttpClient, public _storage: AngularFireStorage) { }
  
  searchOnUTTABDatabase(matricula:string){
    console.log("Leyendo url...");
    let url = this.curl.matricula; 
    let params = {
      xUsuario: matricula,
      xContrasena: 'mw123456789',
      xUniversidad: 42,
      IE: null,
      rand: Math.random()
    };
    console.log("Parametros", params);

    // $.ajax({
    //   url: url,
    //   headers: {
    //       'Content-Type':'applic1ation/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   crossDomain: false,
    //   dataType: 'json',
    //   data: params,
    //   success: function(data){
    //     console.log('succes: ', data);
    //   }
    // });
    // $.post(url,params,function(data){
    //         console.log("Datos ajax", data);
    //     },'json');
        
    

    let headers = new HttpHeaders().set('Content-Type','applic1ation/x-www-form-urlencoded');
    return this.http.post(url, params, {headers: headers});

  }

  public updatePhoto(uidUser,ulr:string){
    //Deprecated

    // let pathNew = this.StoragePath + '/' + uidUser;
    // const RefFile = this._storage.ref(pathNew);


    // const task =  this._storage.upload(pathNew, photo);
    // task.snapshotChanges().pipe(
    //   finalize(()=> {
    //     console.log(RefFile.getDownloadURL());
    //   })
    // ).subscribe();

  }
}
