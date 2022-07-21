import { Auth, CompleteFn, ErrorFn, NextOrObserver, User } from "firebase/auth";

export type OnAuthStateChanged = (
  auth: Auth,
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined
) => void;
