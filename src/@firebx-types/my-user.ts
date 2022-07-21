import {UserRole} from "@firebx-types/user-role"

export interface CreateMyUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole
}

export interface MyUser extends Omit<CreateMyUser, "password"> {
  uid: string;
  displayName: string;
}

// CreateMyUserUser is for signing up a new user (not manager)
export type CreateMyUserUser = Omit<CreateMyUser, "role">;

export interface UpdateMyUser extends CreateMyUser {
  uid: string
}