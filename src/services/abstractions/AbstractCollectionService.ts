import {WithUid} from "../../@firebx-types";
import {FetchServiceProps} from "../../@firebx-types/service";
import {AbstractFetchService} from "./AbstractFetchService";

export abstract class AbstractCollectionService<Type extends WithUid> extends AbstractFetchService<Type> {

  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }

}