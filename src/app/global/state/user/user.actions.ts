import { createAction, props } from "@ngrx/store";
import { User } from "../../models";

export const allNavbarActions = {
    loginFlowInitiated: createAction("[Navbar] Login Flow Initiated"),
    logoutFlowInitiated: createAction("[Navbar] Logout Flow Initiated"),
};
  
export const updateUserDetails = createAction("[User update Flow] User details updated", props<{ userDetails : User}>());
export const setUserDetails = createAction("[Set user Flow] User details updated");

export const userUpdateSuccess = createAction(
    "[User update Flow] User details successfully updated",
    props<{ userDetails : User}>()
);

export const userUpdateFailed = createAction(
    "[Auth Flow] User Changed",
    props<{ error: any }>()
);