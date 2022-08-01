import {AppError, BaseFetchService, FetchServiceProps, FirebxRootStore} from "../@firebx-types";
import {autorun} from "mobx";
import {BehaviorSubject, map} from "rxjs";

interface StoreData<Type> {
  data: Type | null;
  collectionRef: string;
  initialized: boolean
  isFetching: boolean
  error: Error | null
  errorCount: number
  children?: StoreData<Type>[]
}

function getDefaultStoreData<Type>(): StoreData<Type> {
  return {
    data: null,
    collectionRef: "",
    initialized: false,
    isFetching: false,
    error: null,
    errorCount: 0,
    children: []
  }
}

// eslint-disable-next-line no-use-before-define
export abstract class AbstractBaseStore<
  Type,
  RootStore extends FirebxRootStore,
  FetchService extends BaseFetchService<RootStore>
  > {
  rootStore: RootStore

  protected updatedKeys:string[] = [];

  data$: BehaviorSubject<StoreData<Type>> = new BehaviorSubject(getDefaultStoreData<Type>())

  fetchService: BaseFetchService<RootStore>

  protected constructor(
    FetchConstructor: { new (args: FetchServiceProps<RootStore>): BaseFetchService<RootStore> },
    { rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    this.rootStore = rootStore
    this.fetchService = new FetchConstructor({ rootStore, collectionId, dependencyFetches })
    this.observeData();
  }

  observeData() {
    for (const [key] of Object.entries(this.data$.value)) {
      Object.defineProperty(this, `${key}$`, {
        get: () => { return this.data$.pipe(
          map(data => data[key as keyof StoreData<Type>])
        ); },
        set: (value: any) => {
          if (this.data$.value[key as keyof StoreData<Type>] !== value) {
            this.data$.next({
              ...this.data$.value,
              [key]: value
            })
            this.updatedKeys.push(key);
          }
        },
      });
    }
    console.log('keys', Object.keys(this))
  }

  async fetchAndStoreData(fetch = !this.data$.value.initialized && !this.data$.value.isFetching) {
    if (this.data$.value.isFetching)
      await this.initializeWhenResolved()
    else if (fetch) {
      try {
        this.setIsFetching();
        const data = await this.fetchService.fetch();
        if (!data) return this.incrementErrorCountAndRefetch();
        this.setData(data);
        this.resetErrorCount();
        this.setInitialized();
      } catch (err) {
        this.handleError(err)
        if (this.data$.value.errorCount < 4) {
          await this.incrementErrorCountAndRefetch();
        } else {
          this.setInitialized();
        }
      }
    }
  }

  async initializeWhenResolved() {
    return new Promise<void>((resolve, reject) => {
      autorun(() => {
        if (this.data$.value.initialized) resolve();
      });
      setTimeout(() => {
        reject();
      }, 5000);
    });
  }

  setErrorCount(errorCount: number) {
    this.data$.next({
      ...this.data$.value,
      errorCount
    })
  }

  async incrementErrorCountAndRefetch() {
    this.setErrorCount(this.data$.value.errorCount + 1);
    await this.fetchAndStoreData();
  }

  handleError(error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      this.setError(error);
    }
    else {
      console.error(AppError.UnexpectedError, error);
      this.setError(new Error(AppError.UnexpectedError));
    }
    this.resetIsFetching();
  }

  setIsFetching() {
    this.data$.next({
      ...this.data$.value,
      isFetching: true
    })
    this.resetError()
  }

  resetIsFetching() {
    this.data$.next({
      ...this.data$.value,
      isFetching: false
    })
  }

  setError(error: Error) {
    this.data$.next({
      ...this.data$.value,
      error
    })
  }

  resetError() {
    this.data$.next({
      ...this.data$.value,
      error: null
    })
  }

  resetErrorCount() {
    this.data$.next({
      ...this.data$.value,
      errorCount: 0
    })
  }

  setData(data: any, callback?: () => void) {
    this.data$.next({
      ...this.data$.value,
      data
    })
    if (callback) callback();
  }

  setInitialized() {
    this.data$.next({
      ...this.data$.value,
      isFetching: false,
      initialized: true
    })
  }

  resetStore() {
    this.data$.next(getDefaultStoreData<Type>())
  }

}
