import { Injectable } from '@angular/core';
import firebase from 'firebase';


import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(user: User) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }
  register(user: User) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  }

  signOut(){
    return firebase.auth().signOut();
  }

  delete() {
    return firebase.auth().currentUser.delete();
  }

  getAuth() {
    return firebase.auth();
  }

}