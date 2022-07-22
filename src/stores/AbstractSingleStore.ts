import {FetchServiceProps, FetchSingleService, WithUid} from "../@firebx-types";
import {AbstractBaseStore} from "./AbstractBaseStore";

export abstract class AbstractSingleStore<Type extends WithUid> extends AbstractBaseStore<Type, FetchSingleService<Type>> {

  protected constructor(
    FetchConstructor: { new (args: FetchServiceProps): FetchSingleService<Type> },
    { rootStore, collectionId }: FetchServiceProps
  ) {
    super(FetchConstructor, { rootStore, collectionId });
  }

}