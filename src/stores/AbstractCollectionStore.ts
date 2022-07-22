import {WithUid} from "../@firebx-types";
import {FetchCollectionService, FetchServiceProps} from "../@firebx-types/service";
import {FetchCollection} from "../services/FetchCollection";
import {AbstractBaseStore} from "./AbstractBaseStore";

export abstract class AbstractCollectionStore<Type extends WithUid>
  extends AbstractBaseStore<Type[], FetchCollectionService<Type>> {

  protected constructor({ rootStore, collectionId }: FetchServiceProps) {
    super(FetchCollection,{rootStore, collectionId });
  }

  getItemByUid(uid: string): Type | undefined {
    if (!uid) return undefined;
    if (this.data === null) return undefined;
    if (!Array.isArray(this.data)) {
      throw new Error("data is not an array");
    }
    return this.data?.find(item => item.uid === uid)
  }

}