import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import firebase from 'firebase'
import { title } from 'process';

import { ListProduct } from '../../interfaces/list-product';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {
  private db = firebase.firestore;

  constructor(
    private afs: AngularFirestoreModule
   ) { }

  create(data: ListProduct) {
    this.db().collection("listItens").add({
      title: data.titile,
      status: data.status,
      userId: data.userId
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  getItens(userId: string) {
    return this.db().collection("listItens").where("userId", "==", userId)
    .get()
    .then(function(querySnapshot) {
        return (querySnapshot.docs.map(action => {
          const data = action.data();
          const id = action.id;

          return {id, data}          
        }))
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  concluir(id: string) {
    return this.db().collection("listItens").doc(id).update({status: "desativado"});
  }

  excluir(id: string) {
    return this.db().collection("listItens").doc(id).delete();
  }

  ex(){
    console.log("e")
  }
  finalizarCompras(userId: string) {
    return this.db().collection("listItens").where("userId", "==", userId)
    .get()
    .then(async function(querySnapshot) {
        await (querySnapshot.docs.map(async function(action) {
        
          const id = action.id;

          await firebase.firestore().collection("listItens").doc(id).delete();
        }))
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}
