import {WithUid} from "@firebx-types/with-uid";
import {FetchServiceProps, FetchSingleService} from "@firebx-types/service";
import {AbstractFetchService} from "@services/abstractions/AbstractFetchService";

export abstract class AbstractSingleService<Type extends WithUid>
  extends AbstractFetchService<Type> implements FetchSingleService<Type>{

  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }

}