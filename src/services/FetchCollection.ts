import {FetchServiceProps, FirebxRootStore, WithUid} from "../@firebx-types";
import {AbstractCollectionService} from "./abstractions";

export class FetchCollection<Type extends WithUid, RootStore extends FirebxRootStore>
  extends AbstractCollectionService<Type, RootStore> {

  constructor({ rootStore, collectionId }: FetchServiceProps<RootStore>) {
    super({ rootStore, collectionId });
  }

  async fetch() {
    // await Promise.all([
    //   this.rootStore.userStore.fetchAndStoreData(),
    //   ...this.dependencyFetches
    // ]);
    // if (!this.rootStore.userStore.data?.uid)
    //   throw new Error(AppError.UserUndefined);
    return this.fetchAll()
  }

}
