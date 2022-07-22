import {AbstractCollectionStore} from "@stores/AbstractCollectionStore";
import {WithUid} from "@firebx-types/with-uid";
import {FetchServiceProps} from "@firebx-types/service";

export class CollectionStore<Type extends WithUid> extends AbstractCollectionStore<Type> {
  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }
}