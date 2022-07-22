import { FirebxRootStore } from "../@firebx-types";
import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export class FirebaseStore {
  readonly rootStore: FirebxRootStore;

  readonly firestore: Firestore;

  constructor(rootStore: FirebxRootStore, firebaseApp: FirebaseApp) {
    this.rootStore = rootStore;
    this.firestore = getFirestore(firebaseApp);
  }

}
