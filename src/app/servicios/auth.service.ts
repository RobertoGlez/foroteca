import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Usuario } from '../models/usuarios.interface';
// import 'rxjs/operators/switchMap';
import * as firebase from 'firebase/app';
// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
// (window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoginState: Observable<firebase.User>;
  public userObservador:Observable<Usuario>;
  private userCollection:AngularFirestoreCollection<Usuario>
  private UserDocument:AngularFirestoreDocument<Usuario>
  public dataUser:Usuario = undefined;

  constructor(public router: Router,
              public _firebaseAuth:AngularFireAuth,
              public db:AngularFirestore) {

    this.userLoginState = _firebaseAuth.authState;
    this.userLoginState.subscribe(user=>{
      if(user){ 
        this.UserDocument =  this.db.doc<Usuario>("usuarios/"+user.uid);
        this.userObservador = this.UserDocument.valueChanges();
        this.userObservador.subscribe(u => {
          this.dataUser = u
          console.log("User", this.dataUser)
        })
        
      }else{
        this.dataUser = undefined;
        // console.log("No tienes session iniciada");
      }
    });
  }
  public singIn(email,pass,newUser:Usuario){
    firebase.auth().createUserWithEmailAndPassword(email,pass).then((UserCreate)=>{
      console.log("Usuario Creado",UserCreate);
      newUser.uid = UserCreate.user.uid;
      this.RegistrarFirebase(newUser);
    }).catch(error=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Codigo de error:",errorCode);
      console.log("Mensaje:", errorMessage);
      if(errorCode == "auth/email-already-in-use"){
        alert('El correo: "'+ newUser.email +'" ya se uso');
      }
      

    });
  }
  private RegistrarFirebase(newUser:Usuario){
    this.userCollection = this.db.collection<Usuario>('usuarios');
    console.log(newUser);
    this.userCollection.doc(newUser.uid).set(newUser).then(usuario=>{
        console.log('Usuario Insertado!');
      }).catch(err=>{
        console.log("Hubo un error",err);
      });
  }


  public login(email,pass): void {
    firebase.auth().signInWithEmailAndPassword(email,pass).then(logueado=>{
      console.log("Usuario Reconocido",logueado);
      
    }).catch(err=>{
      console.log("Hubo un error",err);
    });
  }

  public signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Se cerro correctamente");
    }).catch(function(error) {
      // An error happened.
      console.error("Se produjo un error",error);
    });
  }
  /**
   * Funcion que determina si el usuario esta logueado o no, y que consulta los datos en firebase.
   * por defecto tiene 10 intentos cada 500 milisegundos
   * @param trying_ Tipo numero - Numero de intentos que tiene la peticion 
   * @param timeInterval_  Tipo Numero - cantidad de milisegundos en que se hara cada peticion
   */
  public LoginStatus(trying_?:10,timeInterval_?:500){
    return new Promise((resolve,reject)=>{
      let Logueado = this.userLoginState.subscribe(estado=>{
        if(estado){
          let veces = 0;
          let intentos = trying_;
          var intervalo = setInterval(()=>{
            if(this.dataUser){
              clearInterval(intervalo);
              resolve(true);
            }
            if(veces > intentos){
              clearImmediate(intervalo)
              reject(" No se encontro datos del usuario");
            }
          },timeInterval_);
        }else{
          reject("No esta logueado");
        }
      });
    });
  }

}