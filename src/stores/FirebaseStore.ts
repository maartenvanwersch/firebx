import { FirebxRootStore } from "../@firebx-types";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import {Functions, getFunctions} from 'firebase/functions';

export class FirebaseStore {
  readonly rootStore: FirebxRootStore;

  readonly firebaseApp: FirebaseApp;

  readonly firestore: Firestore;

  readonly auth: Auth;

  readonly functions: Functions;

  constructor({ rootStore, firebaseOptions }: { rootStore: FirebxRootStore, firebaseOptions: FirebaseOptions }) {
    this.rootStore = rootStore;
    this.firebaseApp = initializeApp(firebaseOptions);
    this.firestore = getFirestore(this.firebaseApp);
    this.auth = getAuth(this.firebaseApp);
    this.functions = getFunctions(this.firebaseApp);
  }

}

