import {FetchServiceProps, FetchSingleService, FirebxRootStore, WithUid} from "../@firebx-types";
import {AbstractBaseStore} from "./AbstractBaseStore";

export abstract class AbstractSingleStore<
  Type extends WithUid,
  RootStore extends FirebxRootStore
  > extends AbstractBaseStore<Type, RootStore, FetchSingleService<Type, RootStore>> {

  protected constructor(
    FetchConstructor: { new (args: FetchServiceProps<RootStore>): FetchSingleService<Type, RootStore> },
    { rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>
  ) {
    super(FetchConstructor, { rootStore, collectionId, dependencyFetches });
  }

}