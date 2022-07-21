import {WithUid} from "@firebx-types/with-uid";
import {FetchCollectionService} from "@firebx-types/service";
import {FetchCollection} from "@services/FetchCollection";
import {AbstractBaseStore} from "@stores/AbstractBaseStore";
import {StoreProps} from "@firebx-types/store";

export abstract class AbstractCollectionStore<Type extends WithUid>
  extends AbstractBaseStore<Type[], FetchCollectionService<Type>> {

  protected constructor({ rootStore, collectionId }: StoreProps) {
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