import { FirebxRootStore } from "../@firebx-types";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import {Functions, getFunctions} from 'firebase/functions';

export class FirebaseStore {
  readonly rootStore: FirebxRootStore;

  readonly firebaseApp: FirebaseApp;

  readonly firestore: Firestore;

  readonly auth: Auth;

  readonly functions: Functions;

  constructor({ rootStore, firebaseConfig }: { rootStore: FirebxRootStore, firebaseConfig: any }) {
    this.rootStore = rootStore;
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
    this.auth = getAuth(this.firebaseApp);
    this.functions = getFunctions(this.firebaseApp);
  }

}

