import { userReducerInterface } from './interfaces/userReducerInterface';
import { userActionInterface } from './interfaces/userActionInterface';
import { userActionTypes } from './action-types/userActionTypes';
export const initialState = {
  name: "",
  avatar: "",
  isAuthentication: false,
  fetch: {
    status: 0,
    code: "",
    message: ""
  }
}

export const userReducer = (state: userReducerInterface = initialState, action: userActionInterface) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_WITH_REJECT:
      return {
        ...state,
        fetch: {
          status: action.payload.status,
          code: action.payload.code,
          message: action.payload.message
        }
      };

    case userActionTypes.USER_LOGIN_WITH_RESOLVE:
      return {
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
        isAuthentication: true,
        fetch: {
          status: action.payload.status,
          code: action.payload.code,
          message: action.payload.message
        }
      }
    default:
      return state
  }
};