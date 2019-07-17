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
  getElement() {
    return this.db.collection('definiciones').doc('fct0X41JCmuFZm8EGWbC');
  }
}
