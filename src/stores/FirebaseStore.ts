import { FirebxRootStore } from "@firebx-types/firebx-root-store";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

export declare class FirebaseStore {
  readonly rootStore: FirebxRootStore;

  readonly firestore: Firestore;

  constructor(rootStore: FirebxRootStore, firebaseApp: FirebaseApp)

}
