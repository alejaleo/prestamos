import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebase: AngularFirestore) { }
//servicio firebase conectado a redux adicionar usuarios
  addFirebase(collectionFirebase: string, objectFirebase: object):Promise<any>{
    return this.firebase.collection(collectionFirebase).add(objectFirebase);
  }
//traer usuarios
  getFirebase(collectionFirebase: string):Observable<any>{
    return this.firebase.collection(collectionFirebase, ref => ref.orderBy('dateCreate','asc')).snapshotChanges();
  }
//borrar usuarios
 /*  deleteFirebase(collectionFirebase:string, idFirebase:string){
    return this.firebase.collection(collectionFirebase).doc(idFirebase).delete();
  } */
//actualizar usuarios
  putFirebase(collectionFirebase:string, idFirebase:string, object:object):Promise<any>{
    return this.firebase.collection(collectionFirebase).doc(idFirebase).update(object);
  }
}
