import { User } from "../../models";

export interface UserState {
  userDetails: User | undefined;
}

export const initialState: UserState = {
    userDetails: undefined
};