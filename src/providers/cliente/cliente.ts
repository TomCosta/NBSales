import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteProvider {
  private PATH = 'CUSTOMER/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('NAME'))
    .snapshotChanges()
    //mapear o acesso externo/ na exibição do html
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    })
  }

  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    })
  }

  save(cliente: any){
    return new Promise((resolve, reject) => {
     //se tiver a chave, é uma alteração
      if (cliente.key){
        this.db.list(this.PATH)
        .update(cliente.key, {name: cliente.name, phone: cliente.phone})
        .then(() => resolve())
        .catch((e) => reject(e));
      }
      else {
        this.db.list(this.PATH)
        .push({name: cliente.name, phone: cliente.phone})
        .then(() => resolve());
      }
    })
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }
}
