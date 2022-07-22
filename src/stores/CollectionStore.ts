import {AbstractCollectionStore} from "./AbstractCollectionStore";
import {WithUid} from "../@firebx-types";
import {FetchServiceProps} from "../@firebx-types/service";

export class CollectionStore<Type extends WithUid> extends AbstractCollectionStore<Type> {
  constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }
}