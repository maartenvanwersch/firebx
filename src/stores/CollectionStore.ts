import {AbstractCollectionStore} from "./AbstractCollectionStore";
import {WithUid, FetchServiceProps, FirebxRootStore} from "../@firebx-types";

export class CollectionStore<
  Type extends WithUid,
  RootStore extends FirebxRootStore
  > extends AbstractCollectionStore<Type, RootStore> {
  constructor({ rootStore, collectionId }: FetchServiceProps<RootStore>) {
    super({ rootStore, collectionId });
  }
}