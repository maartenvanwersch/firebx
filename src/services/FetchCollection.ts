import {FetchServiceProps, FirebxRootStore, WithUid} from "../@firebx-types";
import {AbstractCollectionService} from "./abstractions";

export class FetchCollection<Type extends WithUid, RootStore extends FirebxRootStore>
  extends AbstractCollectionService<Type, RootStore> {

  constructor({ rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    super({ rootStore, collectionId, dependencyFetches });
  }

  async fetch() {
    return this.fetchAll()
  }

}
