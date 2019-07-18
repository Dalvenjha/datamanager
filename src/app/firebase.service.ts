import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getElements() {
    return this.db.collection('definiciones').snapshotChanges();
  }

  getRequests() {
    return this.db.collection('requests').snapshotChanges();
  }

  getValues() {
    return this.db.collection('comingvalues').snapshotChanges();
  }

  createUser(value){
    return this.db.collection('definiciones').add({
      nombre: value.nombre,
      description: value.description,
      type: value.type,
      sensitivity: value.sensitivity
    });
  }

  updateData(value){
    return this.db.collection('definiciones').doc(value.id).update(value);
  }
}
