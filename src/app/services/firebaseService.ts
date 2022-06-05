import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebase: AngularFirestore) { }

  addFirebase(collectionFirebase: string, objectFirebase: object):Promise<any>{
    return this.firebase.collection(collectionFirebase).add(objectFirebase);
  }

  getFirebase(collectionFirebase: string):Observable<any>{
    return this.firebase.collection(collectionFirebase).snapshotChanges();
  }

  deleteFirebase(collectionFirebase:string, idFirebase:string){
    return this.firebase.collection(collectionFirebase).doc(idFirebase).delete();
  }
}
