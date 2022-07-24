import {AppError, BaseFetchService, FetchServiceProps, FirebxRootStore} from "../../@firebx-types";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";

export abstract class AbstractFetchService<Type, RootStore extends FirebxRootStore>
  implements BaseFetchService<RootStore> {
  rootStore: RootStore;

  collectionId: string

  dependencyFetches: (() => Promise<void>)[] = [];

  abstract fetch(): Promise<any>;

  protected constructor({ rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    this.rootStore = rootStore;
    this.collectionId = collectionId;
    this.dependencyFetches = dependencyFetches;
  }

  async fetchDependencies(): Promise<void> {
    if (this.dependencyFetches && this.dependencyFetches.length > 0) {
      await Promise.all(this.dependencyFetches?.map(fetch => fetch()));
    }
  }

  async fetchAll() {
    await this.fetchDependencies();
    return this.fetchCollection<Type>(this.collectionId);
  }

  async fetchByUid(uid: string) {
    if (!uid) throw new Error(AppError.UserUndefined);
    await this.fetchDependencies();
    return this.fetchDoc<Type>(this.collectionId, uid);
  }

  async fetchDoc<Doc>(path: string, ...pathSegments: string[]): Promise<Doc | undefined> {
    if (!path) throw new Error("Path must be defined");
    if (!((pathSegments.length + 1) % 2 === 0)) throw new Error("Doc path must be even");
    await this.fetchDependencies();
    const ref = doc(
      this.rootStore.firebaseStore.firestore,
      path,
      ...pathSegments
    );
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      return docSnap.data() as Doc;
    }

    return undefined;
  }

  async fetchCollection<Doc>(path: string, ...pathSegments: string[]): Promise<Doc[] | undefined> {
    if (!path) throw new Error("Path must be defined");
    if ((pathSegments.length + 1) % 2 === 0) throw new Error("Doc path must be uneven");
    await this.fetchDependencies();
    const results: Doc[] = [];
    const q = query(
      collection(this.rootStore.firebaseStore.firestore, path, ...pathSegments)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((snapShot) => {
      // doc.data() is never undefined for query doc snapshots
      results.push(snapShot.data() as Doc);
    });
    return results;
  }

}