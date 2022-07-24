import {AppError, BaseFetchService, FetchServiceProps, FirebxRootStore} from "../@firebx-types";
import {action, autorun, makeObservable, observable, runInAction} from "mobx";

// eslint-disable-next-line no-use-before-define
export abstract class AbstractBaseStore<
  Type,
  RootStore extends FirebxRootStore,
  FetchService extends BaseFetchService<RootStore>
  > {
  rootStore: RootStore

  data: Type | null = null

  fetchService: BaseFetchService<RootStore>

  initialized = false

  isFetching = false

  error: Error | null = null

  errorCount: number = 0

  protected constructor(
    FetchConstructor: { new (args: FetchServiceProps<RootStore>): BaseFetchService<RootStore> },
    { rootStore, collectionId, dependencyFetches }: FetchServiceProps<RootStore>) {
    this.rootStore = rootStore
    this.fetchService = new FetchConstructor({ rootStore, collectionId, dependencyFetches })
    makeObservable(this, {
      data: observable,
      initialized: observable,
      isFetching: observable,
      setIsFetching: action,
      setData: action,
      setInitialized: action,
    })
  }

  async fetchAndStoreData(fetch = !this.initialized && !this.isFetching) {
    if (this.isFetching)
      await this.initializeWhenResolved()
    else if (fetch) {
      try {
        this.setIsFetching();
        const data = await this.fetchService.fetch();
        runInAction(() => {
          if (!data) this.incrementErrorCountAndRefetch();
          this.setData(data);
          this.resetErrorCount();
          this.setInitialized();
        })
      } catch (err) {
        this.handleError(err)
        if (this.errorCount < 4) {
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
        if (this.initialized) resolve();
      });
      setTimeout(() => {
        reject();
      }, 5000);
    });
  }

  async incrementErrorCountAndRefetch() {
    this.errorCount += 1;
    await this.fetchAndStoreData();
  }

  handleError(error: unknown) {
    runInAction(() => {
      if (error instanceof Error) {
        console.error(error.message);
        this.setError(error);
      }
      else {
        console.error(AppError.UnexpectedError, error);
        this.setError(new Error(AppError.UnexpectedError));
      }
      this.resetIsFetching();
    })
  }

  setIsFetching() {
    this.isFetching = true;
    this.resetError()
  }

  resetIsFetching() {
    this.isFetching = false;
  }

  setError(error: Error) {
    this.error = error;
  }

  resetError() {
    this.error = null;
  }

  resetErrorCount() {
    this.errorCount = 0;
  }

  setData(data: any, callback?: () => void) {
    this.data = data;
    if (callback) callback();
  }

  setInitialized() {
    this.isFetching = false
    this.initialized = true;
  }

  resetStore() {
    this.initialized = false;
    this.isFetching = false;
    this.data = null;
  }

}