import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private user: Observable<firebase.User>;
  private userCollection:AngularFirestoreCollection<Usuario>
  public dataUser:Usuario = undefined;
  constructor(public router: Router,
              public _firebaseAuth:AngularFireAuth,
              public db:AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user=>{
      if(user){ 
        this.db.doc<Usuario>("usuarios/"+user.uid).ref.get().then(u=>{
          let user = u.data() as Usuario;
          this.dataUser = user;
          console.log("Usuario Login" ,this.dataUser);
        })
      }else{
        this.dataUser = undefined;
        console.log("No tienes session iniciada");
      }
    })
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

}