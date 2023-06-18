import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Firestore } from '@angular/fire/firestore';


/**
 * O serviço FirebaseService está usando o Firestore fornecido pelo 
 * AppModule.
 * O serviço FirebaseService atua como uma camada de abstração que encapsula o acesso ao banco de dados Firebase, permitindo que outros componentes utilizem essas funcionalidades através de métodos convenientes fornecidos pelo serviço. Através da injeção de dependência do Firestore, o serviço está usando as configurações do Firebase definidas no AppModule.
 * getDatabase, ref, onValue e set do módulo 'firebase/database'. 
 * Esses são métodos e funções relacionados ao Firebase Realtime 
 * Database, que é uma das soluções de armazenamento de dados do 
 * Firebase.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  // Este método retorna o objeto do banco de dados Firebase, obtido através da função getDatabase()
  getDatabase() {
    return getDatabase();
  }

  //setValue(path: string, value: any): Este método define um valor value em um caminho path específico no banco de dados Firebase. Ele usa a função set() do Firebase Realtime Database.
  setValue(path: string, value: any) {
    const database = this.getDatabase();
    set(ref(database, path), value);
  }

  //Este método registra um callback para ser chamado sempre que o valor no caminho path do banco de dados Firebase for alterado. Ele usa a função onValue() do Firebase Realtime Database.
  onValue(path: string, callback: (snapshot: any) => void) {
    const database = this.getDatabase();
    onValue(ref(database, path), callback);
  }

}
