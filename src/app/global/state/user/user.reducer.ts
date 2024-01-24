import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";
import { initialState, UserState } from "./user.state";

const userReducer = createReducer(
  initialState,
  on(UserActions.userUpdateSuccess, (state, { userDetails }) =>{
      return ({
        ...state,
        userDetails: userDetails
      })
    }
  ),
  on(UserActions.allNavbarActions.logoutFlowInitiated, (state) =>{
      return ({
          ...state,
          userDetails: undefined
      })
    }
  ),
  on(UserActions.updateUserDetails, (state) =>{
      return ({
          ...state,
          userDetails: undefined
      })
    }
  )

);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}