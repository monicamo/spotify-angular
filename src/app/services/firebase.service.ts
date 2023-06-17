import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  getDatabase() {
    return getDatabase();
  }

  setValue(path: string, value: any) {
    const database = this.getDatabase();
    set(ref(database, path), value);
  }

  onValue(path: string, callback: (snapshot: any) => void) {
    const database = this.getDatabase();
    onValue(ref(database, path), callback);
  }

}
