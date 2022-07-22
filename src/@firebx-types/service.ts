import {FirebxRootStore} from "./firebx-root-store";

export interface FetchServiceProps<RootStore extends FirebxRootStore> {
  rootStore: RootStore;
  collectionId: string
}

export interface BaseFetchService<RootStore extends FirebxRootStore> extends FetchServiceProps<RootStore> {
  fetch: () => Promise<any>;
  fetchByUid: (uid: string) => Promise<any>;
  fetchByAll: (uid: string) => Promise<any>;
}

export interface FetchCollectionService<Type, RootStore extends FirebxRootStore> extends BaseFetchService<RootStore> {
  fetchAll: () => Promise<Type[] | undefined>;
  fetchByUid: (uid: string) => Promise<Type | undefined>;
}

export interface FetchSingleService<Type, RootStore extends FirebxRootStore> extends BaseFetchService<RootStore> {
  fetchAll: () => Promise<Type[] | undefined>;
  fetchByUid: (uid: string) => Promise<Type | undefined>;
}
