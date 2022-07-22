import { FirebxRootStore } from "../@firebx-types";
import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export class FirebaseStore<RootStore extends FirebxRootStore> {
  readonly rootStore: RootStore;

  readonly firestore: Firestore;

  constructor({ rootStore, firebaseApp }: { rootStore: RootStore, firebaseApp: FirebaseApp }) {
    this.rootStore = rootStore;
    this.firestore = getFirestore(firebaseApp);
  }

}
