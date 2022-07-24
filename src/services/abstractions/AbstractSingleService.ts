import {FetchServiceProps, FetchSingleService, FirebxRootStore, WithUid} from "../../@firebx-types";
import {AbstractFetchService} from "./AbstractFetchService";

export abstract class AbstractSingleService<Type extends WithUid, RootStore extends FirebxRootStore>
  extends AbstractFetchService<Type, RootStore> implements FetchSingleService<Type, RootStore>{

  protected constructor({ rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    super({ rootStore, collectionId, dependencyFetches });
  }

}