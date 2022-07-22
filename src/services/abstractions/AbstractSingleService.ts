import {WithUid} from "../../@firebx-types";
import {FetchServiceProps, FetchSingleService} from "../../@firebx-types/service";
import {AbstractFetchService} from "./AbstractFetchService";

export abstract class AbstractSingleService<Type extends WithUid>
  extends AbstractFetchService<Type> implements FetchSingleService<Type>{

  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super({ rootStore, collectionId });
  }

}