import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Usuario } from '../models/usuarios.interface';
// import 'rxjs/operators/switchMap';
import * as firebase from 'firebase/app';
import * as moment from 'moment'
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
     //Verificamos si hay un usuario en session activa
    this.userLoginState.subscribe(user=>{
      if(user){ 
         //Si hay, hacemos una consulta de sus datos
        this.UserDocument =  this.db.doc<Usuario>("usuarios/"+user.uid);
        this.userObservador = this.UserDocument.valueChanges();
        // y los guardamos en el observable de data user
        this.userObservador.subscribe(u => {
          this.dataUser = u
          console.log("User", this.dataUser)
        })
        
      }else{
        //de lo contrario, reseteamos la variable a indefinido, para evitar que se queden datos importantes
        this.dataUser = undefined;
        // console.log("No tienes session iniciada");
      }
    });
  }

/**
 * Registramos un usuario nuevo mediante los metodos del la variable global de firebase
 * es importante tener en cuenta que retornamos una promesa con el ID del usuario en caso 
 * de que haya registrado correctamente y un objeto de error en caso de que no
 * @param email El nuevo email a registrar
 * @param pass La contraseña, la cual no almacenaremos
 * @param newUser  el objeto usuario a guardar
 */

  public singIn(email,pass,newUser:Usuario){
    return new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email,pass).then((UserCreate)=>{
        console.log("Usuario Creado",UserCreate);
        newUser.uid = UserCreate.user.uid;
        this.RegistrarFirebase(newUser).then(registrado=>{
          resolve({
            error:false,
            mensaje:"Usuario Registrado",
            uid:newUser.uid
          });
        }).catch(err=>{
          reject({
            error:true,
            mensaje:"Error al Registrar usuario",
            errorType:err
          })
        });
      }).catch(error=>{

        var Err = {
          error:true,
          code:error.code,
          mensaje:error.message,
          MensajeUsuario:"Ningun error"
        }
        var usermessage;
        console.log("Codigo de error:",Err.code);
        console.log("Mensaje:", Err.mensaje);

        if(Err.code == "auth/email-already-in-use"){
          usermessage = 'El correo: "'+ newUser.email +'" ya se uso';
        }

        //Estos errores ya los manejo en frontend con los componentes, para eviarlos
        //esto es solo un plan B en caso de que no llegaran a funcionar o los desabilitaran
        if(Err.code == "auth/invalid-email"){
          usermessage = "El correo electronico es invalido";
        }
        if(Err.code == "auth/weak-password"){
          usermessage = "La contraseña es demasiado corta";
        }
        if(Err.code == "auth/operation-not-allowedl"){
          usermessage = "Operacion no permitida";
        }
        Err.MensajeUsuario = usermessage;
      });
    }); 
  }

  /**
   * Guardamos el usuario en la base de dados de CloudFirebase
   * @param newUser El objeto usuario a guardar
   */

  private RegistrarFirebase(newUser:Usuario){
    this.userCollection = this.db.collection<Usuario>('usuarios');
    console.log(newUser);
    return this.userCollection.doc(newUser.uid).set(newUser)
  }

  /**
   * Logueamos la session mediante una funcion de firebase
   * @param email el email de la cuenta
   * @param pass  la contraseña
   */
  public login(email,pass){
    return new Promise( (resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(email,pass).then(logueado=>{
        console.log("Usuario Reconocido",logueado.user.uid);
        this.UpdateLastConecction(logueado.user.uid);
        resolve(true);
      }).catch(err=>{
        reject(err);
        console.log("Hubo un error",err);
      });
    })
    
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
              reject("No se encontro datos del usuario");
            }
          },timeInterval_);
        }else{
          reject("No esta logueado");
        }
      });
    });
  }

  public UpdateInfo(newUser:Usuario){
    this.UserDocument = this.db.collection('usuarios').doc(newUser.uid);
    return this.UserDocument.update(newUser)
  }
  public UpdateLastConecction(uid:string){
    console.log('actualizando conexion');
    let newConecction = moment().format("YYYY-MM-DD HH:mm:ss");
    this.UserDocument = this.db.collection<Usuario>('usuarios').doc(uid);
    this.UserDocument.update({
      fechaConexion:newConecction
    }).then(actualizado=>{
      console.log("Actualizado con exito",actualizado);
    }).catch(err=>{
      console.error("Hubo un error al actualizar",err);
    })
  }

}