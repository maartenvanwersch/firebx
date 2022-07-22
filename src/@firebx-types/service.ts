import {FirebxRootStore} from "@firebx-types/firebx-root-store";

export interface FetchServiceProps {
  rootStore: FirebxRootStore;
  collectionId: string
}

export interface BaseFetchService extends FetchServiceProps {
  fetch: () => Promise<any>;
}

export interface FetchCollectionService<Type> extends BaseFetchService {
  fetchAll: () => Promise<Type[] | undefined>;
  fetchByUid: (uid: string) => Promise<Type | undefined>;
}

export interface FetchSingleService<Type> extends BaseFetchService {
  fetchAll: () => Promise<Type[] | undefined>;
  fetchByUid: (uid: string) => Promise<Type | undefined>;
}
