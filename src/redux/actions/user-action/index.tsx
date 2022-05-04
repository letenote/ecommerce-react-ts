import { Dispatch } from "redux";
import { FetchStatus } from "../../../models/FetchStatus";
import { userActionTypes } from "../../reducers/user-reducer/action-types/userActionTypes";
import { userActionInterface } from "../../reducers/user-reducer/interfaces/userActionInterface";

export const _resolveUserLogin = () => {
  localStorage.setItem('isAuthentication', JSON.stringify(true));
  return (dispatch: Dispatch<userActionInterface>) => {
    dispatch({
      type: userActionTypes.USER_LOGIN_WITH_RESOLVE,
      payload: {
        name: "john doe",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
        status: 200,
        code: "OK",
        message: "Login Success"
      }
    });
  };
};

export const _rejectUserLogin = (fetchStatus: FetchStatus) => {
  return (dispatch: Dispatch<userActionInterface>) => {
    dispatch({
      type: userActionTypes.USER_LOGIN_WITH_REJECT,
      payload: {
        status: fetchStatus.status,
        code: fetchStatus.code,
        message: fetchStatus.message
      }
    });
  };
};