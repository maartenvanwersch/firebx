import {FetchCollectionService, FetchServiceProps, FirebxRootStore, WithUid} from "../@firebx-types";
import {FetchCollection} from "../services";
import {AbstractBaseStore} from "./AbstractBaseStore";

export abstract class AbstractCollectionStore<Type extends WithUid, RootStore extends FirebxRootStore>
  extends AbstractBaseStore<Type[], RootStore, FetchCollectionService<Type, RootStore>> {

  protected constructor({ rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    super(FetchCollection,{rootStore, collectionId, dependencyFetches });
  }

  getItemByUid(uid: string): Type | undefined {
    if (!uid) return undefined;
    if (this.data$.value.data === null) return undefined;
    if (!Array.isArray(this.data$.value.data)) {
      throw new Error("data is not an array");
    }
    return this.data$.value.data?.find(item => item.uid === uid)
  }

}