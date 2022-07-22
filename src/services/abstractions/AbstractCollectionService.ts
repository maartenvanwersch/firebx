import {FetchServiceProps, FirebxRootStore, WithUid} from "../../@firebx-types";
import {AbstractFetchService} from "./AbstractFetchService";

export abstract class AbstractCollectionService<Type extends WithUid, RootStore extends FirebxRootStore>
  extends AbstractFetchService<Type, RootStore> {

  protected constructor({ rootStore, collectionId }: FetchServiceProps<RootStore>) {
    super({ rootStore, collectionId });
  }

}