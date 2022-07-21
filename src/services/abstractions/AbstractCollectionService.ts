import {WithUid} from "@firebx-types/with-uid";
import {FetchServiceProps} from "@firebx-types/service";
import {AbstractFetchService} from "@services/abstractions/AbstractFetchService";

export abstract class AbstractCollectionService<Type extends WithUid> extends AbstractFetchService<Type> {

  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }

}