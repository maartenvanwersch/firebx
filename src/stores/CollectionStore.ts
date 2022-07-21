import {AbstractCollectionStore} from "@stores/AbstractCollectionStore";
import {WithUid} from "@firebx-types/with-uid";
import {StoreProps} from "@firebx-types/store";

export class CollectionStore<Type extends WithUid> extends AbstractCollectionStore<Type> {
  protected constructor({ rootStore, collectionId }: StoreProps) {
    super({ rootStore, collectionId });
  }
}