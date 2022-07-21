import {FetchServiceProps} from "@firebx-types/service";
import {WithUid} from "@firebx-types/with-uid";
import {AbstractCollectionService} from "@services/abstractions/AbstractCollectionService";

export class FetchCollection<Type extends WithUid> extends AbstractCollectionService<Type> {

  constructor({ rootStore, collectionId }: FetchServiceProps) {
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
