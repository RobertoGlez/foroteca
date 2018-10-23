import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uttab } from '../core/curl.uttab';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  public curl = uttab;
  constructor(public http:HttpClient) { }
  
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
}
